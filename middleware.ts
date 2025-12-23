import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  // Public pages
  '/',
  '/reviews',
  '/photos',
  '/prices',
  '/about-ben',
  '/contact',
  '/locations(.*)',
  '/house-archives(.*)',
  '/accommodations(.*)', // Public accommodation pages for SEO
  '/regions(.*)', // Public region pages
  // Authentication pages (must be public)
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Public API routes
  '/api/webhooks(.*)',
  '/api/contact(.*)', // Contact form API (public)
  '/api/test(.*)', // Test endpoints (public)
  '/api/test-supabase(.*)', // Supabase test endpoint (public)
]);

// Only use Clerk middleware if keys are configured
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default clerkPublishableKey
  ? clerkMiddleware(async (auth, request) => {
      // Handle Clerk authentication
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    })
  : () => NextResponse.next();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
