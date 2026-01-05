import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        Oops! The page you are looking for might have been moved, deleted, or possibly never existed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
        >
          Back to Homepage
        </Link>
        <Link
          href="/hen-party-games"
          className="bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors"
        >
          View Fun Games
        </Link>
      </div>
    </div>
  );
}
