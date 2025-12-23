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

    try {
      const response = await fetch('/api/admin/enrich', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          houseIds: Array.from(selectedHouses),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enrich properties');
      }

      setResults(data.results || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.houseId}
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
                  <div className="text-sm text-red-800">✗ Error: {result.error}</div>
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

