"use client";

import { trackOutboundClick } from "@/lib/analytics";
import { trackGTMEvent } from "@/lib/gtm";

interface OutboundLinkProps {
  href: string;
  linkType: 'airbnb' | 'booking_com' | 'vrbo' | 'website' | 'other';
  accommodationName?: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

/**
 * Component for tracking outbound clicks on accommodation booking links
 * Tracks both GA4 and GTM events
 */
export default function OutboundLink({
  href,
  linkType,
  accommodationName,
  className = "",
  children,
  target = "_blank",
  rel = "noopener noreferrer",
}: OutboundLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track in both GA4 and GTM
    trackOutboundClick(href, linkType, accommodationName);
    
    // Also track via GTM for consistency
    trackGTMEvent("outbound_click", {
      event_category: "Outbound Link",
      event_label: `${linkType} - ${accommodationName || 'Unknown'}`,
      link_url: href,
      link_type: linkType,
      accommodation_name: accommodationName,
    });

    // Small delay to ensure tracking fires before navigation
    // (for outbound links, browser may navigate immediately)
    setTimeout(() => {
      // Navigation will happen naturally via href
    }, 100);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target={target}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
}

