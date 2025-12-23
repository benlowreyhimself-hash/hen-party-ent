'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EnrichHousePage() {
  const router = useRouter();
  const params = useParams();
  const houseId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [propertyName, setPropertyName] = useState('');
  const [location, setLocation] = useState('');

  const handleEnrich = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          houseId,
          propertyName: propertyName || undefined,
          location: location || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enrich property');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Enrich Property with AI</h2>
        <p className="text-gray-600">
          Use Gemini AI to automatically fetch and enrich property information
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Name (optional - will use existing if not provided)
            </label>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Church Farm Barn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Location (optional - will use existing if not provided)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Cotswolds"
            />
          </div>

          <button
            onClick={handleEnrich}
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Enriching...' : 'Enrich Property'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-green-800">Enrichment Complete!</h3>
          
          {result.data && (
            <div className="space-y-4">
              {result.data.description && (
                <div>
                  <h4 className="font-semibold mb-2">Description:</h4>
                  <p className="text-gray-700">{result.data.description}</p>
                </div>
              )}

              {result.data.features && result.data.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {result.data.features.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.data.content && (
                <div>
                  <h4 className="font-semibold mb-2">Sales Content:</h4>
                  <p className="text-gray-700 whitespace-pre-line">{result.data.content}</p>
                </div>
              )}

              {result.data.meta_description && (
                <div>
                  <h4 className="font-semibold mb-2">Meta Description:</h4>
                  <p className="text-gray-700">{result.data.meta_description}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <a
              href={`/admin/houses/${houseId}/edit`}
              className="text-primary hover:underline"
            >
              View Updated Property →
            </a>
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

