"use client";

import Link from "next/link";
import { trackPhoneClick, trackEmailClick } from "@/lib/gtm";

export default function ContactButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="tel:07747571426"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
        onClick={() => trackPhoneClick("07747571426")}
      >
        Call: 07747571426
      </a>
      <a
        href="mailto:ben@henpartyentertainment.co.uk"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
        onClick={() => trackEmailClick("ben@henpartyentertainment.co.uk")}
      >
        Email Us
      </a>
      <Link
        href="/contact"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
      >
        Contact Form
      </Link>
    </div>
  );
}

