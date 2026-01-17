import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GTM from "@/components/GTM";
// NOTE: GoogleAnalytics component removed - GTM already loads GA4 via its configuration tag.
// Having both caused duplicate page views. All GA4 tracking now flows through GTM.
import GlobalStructuredData from "@/components/GlobalStructuredData";

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
  keywords: ["hen party life drawing", "hen do ideas", "nude life drawing", "hen party entertainment", "life drawing Bristol", "life drawing Bath", "unique hen party"],
  authors: [{ name: "Ben" }],
  openGraph: {
    title: "Hen Party Life Drawing | Fun & Classy Entertainment UK",
    description: "Book a fun, tasteful naked life drawing class with Ben. Mobile service covering Bristol, Bath & across the UK. From £30pp.",
    url: "https://henpartyentertainment.co.uk",
    siteName: "Hen Party Entertainment",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://henpartyentertainment.co.uk/hero-background.jpeg",
        width: 1200,
        height: 630,
        alt: "Hen Party Life Drawing Entertainment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hen Party Life Drawing | Fun & Classy Entertainment UK",
    description: "Book a fun, tasteful naked life drawing class with Ben. Mobile service covering Bristol, Bath & across the UK.",
    images: ["https://henpartyentertainment.co.uk/hero-background.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
        {/* GoogleAnalytics removed - GTM handles GA4 loading */}
        <GlobalStructuredData />
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
