"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, Search, Menu, X, ChevronDown } from "lucide-react";
import ContactLink from "@/components/ContactLink";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
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
              href="https://www.facebook.com/henpartyent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/henpartyent/"
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
              <div className="relative w-12 h-12">
                <Image
                  src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-pink-letter-h-umt2.png"
                  alt="Hen Party Entertainment"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Homepage
              </Link>

              {/* Locations Dropdown */}
              <div
                className="relative group h-full flex items-center"
                onMouseEnter={() => setLocationsOpen(true)}
                onMouseLeave={() => setLocationsOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-foreground hover:text-primary transition-colors py-4 focus:outline-none"
                  aria-expanded={locationsOpen}
                >
                  Locations <ChevronDown className="w-4 h-4" />
                </button>

                {locationsOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-b-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[60vh] overflow-y-auto">
                    {[
                      { name: 'Bristol', href: '/hen-party-life-drawing-bristol' },
                      { name: 'Bath', href: '/hen-party-life-drawing-bath' },
                      { name: 'London', href: '/hen-party-life-drawing-london' },
                      { name: 'Cardiff', href: '/hen-party-life-drawing-cardiff' },
                      { name: 'Brighton', href: '/hen-party-life-drawing-brighton' },
                      { name: 'Oxford', href: '/hen-party-life-drawing-oxford' },
                      { name: 'Bournemouth', href: '/hen-party-life-drawing-bournemouth' },
                      { name: 'Southampton', href: '/hen-party-life-drawing-southampton' },
                      { name: 'Cheltenham', href: '/hen-party-life-drawing-cheltenham' },
                      { name: 'Gloucester', href: '/hen-party-life-drawing-gloucester' },
                      { name: 'Swindon', href: '/hen-party-life-drawing-swindon' },
                      { name: 'Exeter', href: '/hen-party-life-drawing-exeter' },
                      { name: 'Newquay', href: '/hen-party-life-drawing-newquay' },
                      { name: 'Portsmouth', href: '/hen-party-life-drawing-portsmouth' },
                      { name: 'Swansea', href: '/hen-party-life-drawing-swansea' },
                      { name: 'Tenby', href: '/hen-party-life-drawing-tenby' },
                      { name: 'Cotswolds', href: '/hen-party-life-drawing-cotswolds' },
                    ].map((loc) => (
                      <Link
                        key={loc.name}
                        href={loc.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors border-b border-slate-50 last:border-0"
                        onClick={() => setLocationsOpen(false)}
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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
              {/* Admin link removed for public view */}
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

                <div className="py-2 border-y border-border/50 my-2">
                  <p className="px-0 font-semibold text-sm text-gray-400 mb-2 uppercase tracking-wider">Locations</p>
                  <div className="grid grid-cols-2 gap-2 pl-2">
                    {[
                      { name: 'Bristol', href: '/hen-party-life-drawing-bristol' },
                      { name: 'Bath', href: '/hen-party-life-drawing-bath' },
                      { name: 'London', href: '/hen-party-life-drawing-london' },
                      { name: 'Cardiff', href: '/hen-party-life-drawing-cardiff' },
                      { name: 'Brighton', href: '/hen-party-life-drawing-brighton' },
                      { name: 'Oxford', href: '/hen-party-life-drawing-oxford' },
                      { name: 'Bournemouth', href: '/hen-party-life-drawing-bournemouth' },
                      { name: 'Southampton', href: '/hen-party-life-drawing-southampton' },
                      { name: 'Cheltenham', href: '/hen-party-life-drawing-cheltenham' },
                      { name: 'Gloucester', href: '/hen-party-life-drawing-gloucester' },
                      { name: 'Swindon', href: '/hen-party-life-drawing-swindon' },
                      { name: 'Exeter', href: '/hen-party-life-drawing-exeter' },
                      { name: 'Newquay', href: '/hen-party-life-drawing-newquay' },
                      { name: 'Portsmouth', href: '/hen-party-life-drawing-portsmouth' },
                      { name: 'Swansea', href: '/hen-party-life-drawing-swansea' },
                      { name: 'Tenby', href: '/hen-party-life-drawing-tenby' },
                      { name: 'Cotswolds', href: '/hen-party-life-drawing-cotswolds' },
                    ].map((loc) => (
                      <Link
                        key={loc.name}
                        href={loc.href}
                        className="text-sm text-foreground hover:text-primary transition-colors py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>
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

