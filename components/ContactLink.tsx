"use client";

import { trackPhoneClick, trackEmailClick } from "@/lib/gtm";

interface ContactLinkProps {
  type: "phone" | "email";
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ContactLink({ type, value, className = "", children }: ContactLinkProps) {
  const handleClick = () => {
    if (type === "phone") {
      trackPhoneClick(value);
    } else {
      trackEmailClick(value);
    }
  };

  const href = type === "phone" ? `tel:${value}` : `mailto:${value}`;
  const displayText = children || value;

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {displayText}
    </a>
  );
}

