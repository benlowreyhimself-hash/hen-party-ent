"use client";

import Link from "next/link";
import ContactLink from "@/components/ContactLink";
import { trackButtonClick } from "@/lib/gtm";

export default function ContactButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <ContactLink
        type="phone"
        value="07747571426"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
      >
        Call: 07747571426
      </ContactLink>
      <ContactLink
        type="email"
        value="benlowreyhimself@gmail.com"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
      >
        Email Us
      </ContactLink>
      <Link
        href="/contact"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
        onClick={() => trackButtonClick("Contact Form", "Contact Buttons")}
      >
        Contact Form
      </Link>
    </div>
  );
}

