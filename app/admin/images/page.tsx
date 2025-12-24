
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FileItem {
    name: string;
    size: number;
    url: string;
}

export default function ImageBrowser() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [cursor, setCursor] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadImages = async (reset = false) => {
        setLoading(true);
        try {
            const nextCursor = reset ? 0 : cursor;
            const res = await fetch(`/api/admin/images?cursor=${nextCursor}`);
            const data = await res.json();

            if (data.files) {
                if (reset) {
                    setFiles(data.files);
                } else {
                    setFiles(prev => [...prev, ...data.files]);
                }

                if (data.nextCursor) {
                    setCursor(data.nextCursor);
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages(true);
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Image Browser</h1>
            <p className="mb-4 text-gray-600">
                Please find the "Ben with Glasses" photo below. Click specifically on the correct image to identify it (Logic to be added).
                Currently, just browse to verify it exists.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files.map((file) => (
                    <div key={file.name} className="border rounded p-2 text-xs">
                        <div className="relative h-32 w-full mb-2 bg-gray-100">
                            <Image
                                src={file.url}
                                alt={file.name}
                                fill
                                className="object-contain"
                                sizes="150px"
                            />
                        </div>
                        <div className="truncate font-mono">{file.name}</div>
                        <div className="text-gray-500">{(file.size / 1024).toFixed(1)} KB</div>
                        <a href={file.url} target="_blank" className="text-blue-500 hover:underline block mt-1">Open Full</a>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => loadImages(false)}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
}
