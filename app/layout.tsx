import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GTM from "@/components/GTM";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hen Party Life Drawing | Fun & Classy Entertainment UK | Ben",
  description: "Looking for classy hen party ideas? Book a fun, tasteful naked life drawing class with Ben. No agency fees. Mobile service covering Bristol, Bath & UK.",
  icons: {
    icon: [
      { url: 'https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-pink-letter-h-umt2.png', sizes: 'any' },
    ],
    shortcut: 'https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-pink-letter-h-umt2.png',
    apple: 'https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-pink-letter-h-umt2.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <GTM />
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );

  // Only wrap with ClerkProvider if keys are provided
  if (clerkPublishableKey) {
    return <ClerkProvider publishableKey={clerkPublishableKey}>{content}</ClerkProvider>;
  }

  return content;
}
