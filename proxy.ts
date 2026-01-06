import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
    '/admin(.*)',
]);

// Define public routes that don't need auth
const isPublicRoute = createRouteMatcher([
    '/',
    '/contact(.*)',
    '/reviews(.*)',
    '/photos(.*)',
    '/prices(.*)',
    '/about-ben(.*)',
    '/accommodations(.*)',
    '/hen-party-games(.*)',
    '/hen-party-life-drawing-(.*)',
    '/unique-hen-do-ideas(.*)',
    '/popular(.*)',
    '/sign-in(.*)',
    '/api/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    // Only protect admin and marketing console routes
    if (isProtectedRoute(req) && !isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
