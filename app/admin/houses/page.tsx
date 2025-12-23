import { getAllHouses } from '@/lib/supabase/houses';
import Link from 'next/link';

export default async function AdminHousesPage() {
  let houses: Awaited<ReturnType<typeof getAllHouses>> = [];
  let schemaCacheError = false;
  
  try {
    houses = await getAllHouses();
  } catch (error: any) {
    if (error?.code === 'PGRST205' || error?.isSchemaCacheError || error?.message?.includes('schema cache')) {
      schemaCacheError = true;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Manage Houses</h2>
        <div className="flex gap-4">
          <Link
            href="/admin/analytics"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="/admin/houses/enrich-all"
            className="bg-primary/20 text-primary px-6 py-3 rounded-md hover:bg-primary/30 transition-colors"
          >
            Batch Enrich
          </Link>
          <Link
            href="/admin/houses/new"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Add New House
          </Link>
        </div>
      </div>

      {schemaCacheError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <p className="text-lg font-semibold text-yellow-800 mb-2">
            ⚠️ Schema Cache Refresh Needed
          </p>
          <p className="text-gray-700 mb-4">
            Your 871 accommodations have been imported, but Supabase's API cache needs to refresh.
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Please refresh the schema cache in your Supabase Dashboard:
          </p>
          <ol className="text-sm text-gray-600 text-left max-w-2xl list-decimal list-inside space-y-1 mb-4">
            <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary underline">Supabase Dashboard</a></li>
            <li>Select your project</li>
            <li>Go to <strong>Settings → API</strong></li>
            <li>Click <strong>"Refresh Schema Cache"</strong> or <strong>"Reload Schema"</strong></li>
            <li>Wait 30 seconds, then refresh this page</li>
          </ol>
          <p className="text-xs text-gray-500">
            This usually happens automatically within 1-5 minutes, but you can force it manually.
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {houses.length === 0 && !schemaCacheError ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No houses found. Add your first house to get started.
                </td>
              </tr>
            ) : houses.length === 0 && schemaCacheError ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Waiting for schema cache to refresh... Your 871 accommodations are in the database.
                </td>
              </tr>
            ) : (
              houses.map((house) => (
                <tr key={house.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{house.title}</div>
                    <div className="text-sm text-gray-500">{house.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{house.location}</div>
                    <div className="text-sm text-gray-500">{house.postcode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {house.region || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        house.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {house.is_published ? 'Published' : 'Draft'}
                    </span>
                    {house.is_featured && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/20 text-primary">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/houses/${house.id}/edit`}
                      className="text-primary hover:text-primary/80 mr-4"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/houses/${house.id}/enrich`}
                      className="text-primary hover:text-primary/80 mr-4"
                    >
                      Enrich
                    </Link>
                    <Link
                      href={`/accommodations/${house.slug}`}
                      target="_blank"
                      className="text-primary hover:text-primary/80"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

