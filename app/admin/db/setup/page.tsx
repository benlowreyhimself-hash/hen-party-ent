"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DatabaseSetupPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sql, setSql] = useState<string>('');
  const router = useRouter();

  // Load SQL on mount (client-side)
  useEffect(() => {
    fetch('/api/db/get-schema')
      .then(res => res.json())
      .then(data => {
        if (data.sql) {
          setSql(data.sql);
        }
      })
      .catch(err => {
        console.error('Error loading schema:', err);
        setMessage('Error loading schema. Please check the file manually.');
      });
  }, []);

  const handleCreateTables = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/db/create-tables', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Tables created successfully!');
        setTimeout(() => {
          router.push('/admin/houses');
        }, 2000);
      } else {
        setMessage(data.message || 'Failed to create tables. See SQL below.');
        if (data.sql) {
          setSql(data.sql);
        }
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sql);
    setMessage('✅ SQL copied to clipboard! Paste it in Supabase SQL Editor.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Database Setup</h1>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('✅') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
        }`}>
          <p>{message}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Database Tables</h2>
        <p className="text-muted-foreground mb-4">
          This will create the <code>houses</code> and <code>form_submissions</code> tables in your Supabase database.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleCreateTables}
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Tables Automatically'}
          </button>

          <button
            onClick={handleCopySQL}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Copy SQL to Clipboard
          </button>
        </div>
      </div>

      {sql && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">SQL Schema</h2>
          <p className="text-muted-foreground mb-4">
            If automatic creation fails, copy this SQL and run it manually in Supabase Dashboard → SQL Editor:
          </p>
          <pre className="bg-gray-50 p-4 rounded border overflow-auto max-h-96 text-sm">
            <code>{sql}</code>
          </pre>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Manual Setup Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary underline">Supabase Dashboard</a></li>
          <li>Select your project</li>
          <li>Go to <strong>SQL Editor</strong> in the left sidebar</li>
          <li>Click <strong>New Query</strong></li>
          <li>Copy the SQL from above and paste it</li>
          <li>Click <strong>Run</strong> (or press Cmd/Ctrl + Enter)</li>
          <li>Go to <strong>Table Editor</strong> to verify tables were created</li>
        </ol>
      </div>
    </div>
  );
}

