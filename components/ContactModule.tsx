"use client";

import ContactLink from "@/components/ContactLink";
import Link from "next/link";
import { Phone, Mail, FileText } from "lucide-react";
import { trackButtonClick } from "@/lib/gtm";

interface ContactModuleProps {
  variant?: "compact" | "full" | "inline";
  showFormLink?: boolean;
  className?: string;
}

export default function ContactModule({
  variant = "full",
  showFormLink = true,
  className = ""
}: ContactModuleProps) {
  const phoneNumber = "07747571426";
  const email = "benlowreyhimself@gmail.com";

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        <ContactLink
          type="phone"
          value={phoneNumber}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Phone className="w-4 h-4" />
          {phoneNumber}
        </ContactLink>
        <ContactLink
          type="email"
          value={email}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Mail className="w-4 h-4" />
          {email}
        </ContactLink>
        {showFormLink && (
          <Link
            href="/contact"
            className="flex items-center gap-2 text-primary hover:underline"
            onClick={() => trackButtonClick("Contact Form", "Contact Module")}
          >
            <FileText className="w-4 h-4" />
            Contact Form
          </Link>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`inline-flex items-center gap-4 ${className}`}>
        <ContactLink
          type="phone"
          value={phoneNumber}
          className="text-primary hover:underline"
        >
          {phoneNumber}
        </ContactLink>
        <span className="text-muted-foreground">|</span>
        <ContactLink
          type="email"
          value={email}
          className="text-primary hover:underline"
        >
          {email}
        </ContactLink>
        {showFormLink && (
          <>
            <span className="text-muted-foreground">|</span>
            <Link
              href="/contact"
              className="text-primary hover:underline"
              onClick={() => trackButtonClick("Contact Form", "Contact Module")}
            >
              Contact Form
            </Link>
          </>
        )}
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
      <ContactLink
        type="phone"
        value={phoneNumber}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-2"
      >
        <Phone className="w-5 h-5" />
        Call: {phoneNumber}
      </ContactLink>
      <ContactLink
        type="email"
        value={email}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-2"
      >
        <Mail className="w-5 h-5" />
        Email Us
      </ContactLink>
      {showFormLink && (
        <Link
          href="/contact"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-2"
          onClick={() => trackButtonClick("Contact Form", "Contact Module")}
        >
          <FileText className="w-5 h-5" />
          Contact Form
        </Link>
      )}
    </div>
  );
}

