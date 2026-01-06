"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import ContactLink from "@/components/ContactLink";
import { trackButtonClick } from "@/lib/gtm";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          {/* Social Media & Reviews Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Follow & Reviews</h3>
            <div className="flex flex-col gap-4 items-center">
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/henpartyent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/henpartyent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <div>
                <a
                  href="https://share.google/SkTxcIAp7GAgditi0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  View Google Reviews
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/hen-party-games" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Top 10 Hen Party Games
          </Link>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hen Party Entertainment. All rights reserved.</p>
          <Link href="/marketing-console" className="text-xs text-muted-foreground/50 hover:text-muted-foreground mt-2 inline-block">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

