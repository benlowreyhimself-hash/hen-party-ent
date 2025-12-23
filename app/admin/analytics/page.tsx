"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Analytics & Reports</h1>
        <p className="text-lg text-muted-foreground">
          View reports and manage tracking configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Google Analytics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Google Analytics 4</h2>
          {gaMeasurementId ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Measurement ID: <code className="bg-muted px-2 py-1 rounded">{gaMeasurementId}</code>
              </p>
              <a
                href={`https://analytics.google.com/analytics/web/#/p${gaMeasurementId.replace('G-', '')}/reports/intelligenthome`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Open Google Analytics
                <ExternalLink className="w-4 h-4" />
              </a>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Google Analytics not configured. Add <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code> to your environment variables.
              </p>
            </div>
          )}
        </div>

        {/* Google Tag Manager */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Google Tag Manager</h2>
          {gtmId ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Container ID: <code className="bg-muted px-2 py-1 rounded">{gtmId}</code>
              </p>
              <a
                href={`https://tagmanager.google.com/#/container/accounts/~2F${gtmId}/containers/${gtmId.replace('GTM-', '')}/workspaces`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Open Tag Manager
                <ExternalLink className="w-4 h-4" />
              </a>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Google Tag Manager not configured. Add <code>NEXT_PUBLIC_GTM_ID</code> to your environment variables.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tracked Events */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tracked Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Contact Events</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Phone clicks</li>
              <li>• Email clicks</li>
              <li>• Contact form submissions</li>
              <li>• Template requests</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Accommodation Events</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Accommodation page views</li>
              <li>• Outbound booking link clicks</li>
              <li>• Region filter usage</li>
              <li>• View mode changes (grid/list)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Engagement Events</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Button clicks</li>
              <li>• Page views</li>
              <li>• Google Maps clicks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Conversion Events</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Form submissions</li>
              <li>• Google Ads conversions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://analytics.google.com/analytics/web/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Google Analytics Dashboard
          </a>
          <a
            href="https://tagmanager.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Tag Manager Dashboard
          </a>
          <a
            href="https://ads.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Google Ads Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

