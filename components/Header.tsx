"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, Search, Menu, X } from "lucide-react";

export default function Header() {
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationsOpen(false);
      }
    };

    if (isLocationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLocationsOpen]);

  return (
    <header className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:07747571426" className="hover:opacity-80 transition-opacity">
              07747571426
            </a>
            <a href="mailto:ben@henpartyentertainment.co.uk" className="hover:opacity-80 transition-opacity">
              ben@henpartyentertainment.co.uk
            </a>
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
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  Locations
                  <span className="text-xs">▼</span>
                </button>
                {isLocationsOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[150px] z-50">
                    <Link
                      href="/locations/bath"
                      className="block px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setIsLocationsOpen(false)}
                    >
                      Bath
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/house-archives" className="text-foreground hover:text-primary transition-colors">
                House archives
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
                  href="/locations/bath"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Locations - Bath
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/house-archives"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  House archives
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

