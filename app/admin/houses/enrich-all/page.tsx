'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EnrichAllHousesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState<any[]>([]);
  const [selectedHouses, setSelectedHouses] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  useEffect(() => {
    // Fetch all houses
    fetch('/api/admin/houses')
      .then(res => res.json())
      .then(data => {
        if (data.houses) {
          setHouses(data.houses);
        }
      })
      .catch(err => {
        console.error('Error fetching houses:', err);
      });
  }, []);

  const toggleHouse = (houseId: string) => {
    const newSelected = new Set(selectedHouses);
    if (newSelected.has(houseId)) {
      newSelected.delete(houseId);
    } else {
      newSelected.add(houseId);
    }
    setSelectedHouses(newSelected);
  };

  const selectAll = () => {
    setSelectedHouses(new Set(houses.map(h => h.id)));
  };

  const deselectAll = () => {
    setSelectedHouses(new Set());
  };

  const handleEnrichAll = async () => {
    if (selectedHouses.size === 0) {
      setError('Please select at least one house to enrich');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setProgress({ current: 0, total: selectedHouses.size });

    const houseIdsToEnrich = Array.from(selectedHouses);
    const newResults: any[] = [];

    for (let i = 0; i < houseIdsToEnrich.length; i++) {
      const houseId = houseIdsToEnrich[i];
      const currentHouse = houses.find(h => h.id === houseId);
      const title = currentHouse?.title || 'Unknown';

      try {
        const response = await fetch('/api/admin/enrich', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ houseId }),
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          // If response is not JSON (e.g., HTML error page from Vercel timeout/crash)
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to enrich property');
        }

        const data = await response.json();
        newResults.push({
          houseId,
          title,
          success: true,
          updated: data.updated,
          addressVerified: data.addressVerification?.is_public_property || false,
          progress: {
            current: i + 1,
            total: houseIdsToEnrich.length,
            percentage: Math.round(((i + 1) / houseIdsToEnrich.length) * 100),
          },
        });

      } catch (err: any) {
        newResults.push({
          houseId,
          title,
          success: false,
          error: err.message,
          progress: {
            current: i + 1,
            total: houseIdsToEnrich.length,
            percentage: Math.round(((i + 1) / houseIdsToEnrich.length) * 100),
          },
        });
      } finally {
        setResults([...newResults]); // Update results after each item
        setProgress({
          current: i + 1,
          total: houseIdsToEnrich.length,
          percentage: Math.round(((i + 1) / houseIdsToEnrich.length) * 100),
        });
        // Add a small delay to prevent overwhelming the API or UI
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setLoading(false);
    setProgress(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Batch Enrich Properties</h2>
        <p className="text-gray-600">
          Use Gemini AI to automatically enrich multiple properties at once
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-600">
              {selectedHouses.size} of {houses.length} selected
            </span>
          </div>
          <div className="space-x-2">
            <button
              onClick={selectAll}
              className="text-sm text-primary hover:underline"
            >
              Select All
            </button>
            <button
              onClick={deselectAll}
              className="text-sm text-gray-600 hover:underline"
            >
              Deselect All
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {houses.map((house) => (
            <label
              key={house.id}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedHouses.has(house.id)}
                onChange={() => toggleHouse(house.id)}
                className="rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{house.title}</div>
                <div className="text-sm text-gray-500">{house.location}</div>
              </div>
            </label>
          ))}
        </div>

        {progress && (
          <div className="mt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Progress: {progress.current} of {progress.total}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((progress.current / progress.total) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleEnrichAll}
          disabled={loading || selectedHouses.size === 0}
          className="mt-4 w-full bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Enriching...' : `Enrich ${selectedHouses.size} Properties`}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Enrichment Results</h3>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Summary:</strong> {results.filter(r => r.success).length} successful, {results.filter(r => !r.success).length} failed out of {results.length} total
            </p>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <div
                key={result.houseId || index}
                className={`p-3 rounded ${
                  result.success
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="font-medium">{result.title}</div>
                {result.success ? (
                  <div className="text-sm text-green-800">✓ Successfully enriched</div>
                ) : (
                  <div className="text-sm text-red-800">✗ Error: {result.error || 'Unknown error'}</div>
                )}
                {result.progress && (
                  <div className="text-xs text-gray-500 mt-1">
                    Progress: {result.progress.current}/{result.progress.total} ({result.progress.percentage}%)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <a
          href="/admin/houses"
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back to Houses
        </a>
      </div>
    </div>
  );
}

