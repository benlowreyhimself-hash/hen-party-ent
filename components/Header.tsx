"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, Search, Menu, X } from "lucide-react";
import ContactLink from "@/components/ContactLink";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <ContactLink
              type="phone"
              value="07747571426"
              className="hover:opacity-80 transition-opacity"
            >
              07747571426
            </ContactLink>
            <ContactLink
              type="email"
              value="ben@henpartyentertainment.co.uk"
              className="hover:opacity-80 transition-opacity"
            >
              ben@henpartyentertainment.co.uk
            </ContactLink>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {/* Clerk Login Button */}
            {mounted && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
              <div className="ml-2">
                <a
                  href="/sign-in"
                  className="text-xs hover:opacity-80 transition-opacity"
                  aria-label="Sign In"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-2xl font-bold">H</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Homepage
              </Link>
              <Link href="/reviews" className="text-foreground hover:text-primary transition-colors">
                Reviews
              </Link>
              <Link href="/photos" className="text-foreground hover:text-primary transition-colors">
                Photos
              </Link>
              <Link href="/prices" className="text-foreground hover:text-primary transition-colors">
                Prices
              </Link>
              <Link href="/about-ben" className="text-foreground hover:text-primary transition-colors">
                About Ben
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/accommodations" className="text-foreground hover:text-primary transition-colors">
                Accommodations
              </Link>
              <Link href="/admin/houses" className="text-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            </div>

            {/* Search Icon & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button className="text-foreground hover:text-primary transition-colors hidden md:block">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:text-primary transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Homepage
                </Link>
                <Link
                  href="/reviews"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reviews
                </Link>
                <Link
                  href="/photos"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Photos
                </Link>
                <Link
                  href="/prices"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Prices
                </Link>
                <Link
                  href="/about-ben"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Ben
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/accommodations"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accommodations
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

