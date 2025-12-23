"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import ContactLink from "@/components/ContactLink";
import { trackButtonClick } from "@/lib/gtm";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => trackButtonClick("Contact Form", "Footer")}
                >
                  Contact Form
                </Link>
              </li>
              <li>
                <ContactLink 
                  type="phone" 
                  value="07747571426"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  07747571426
                </ContactLink>
              </li>
              <li>
                <ContactLink 
                  type="email" 
                  value="ben@henpartyentertainment.co.uk"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ben@henpartyentertainment.co.uk
                </ContactLink>
              </li>
            </ul>
          </div>

          {/* Social Media & Reviews Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow & Reviews</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com"
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
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hen Party Entertainment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

