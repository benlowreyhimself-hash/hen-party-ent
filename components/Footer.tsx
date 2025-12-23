import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Blog</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog/church-farm-barn" className="text-muted-foreground hover:text-primary transition-colors">
                  Church Farm Barn
                </Link>
              </li>
              <li>
                <Link href="/blog/forest-holiday" className="text-muted-foreground hover:text-primary transition-colors">
                  Forest Holiday Hen Party Activity Life Drawing Nude Model – Forest of Dean
                </Link>
              </li>
              <li>
                <Link href="/blog/cotswold-manor" className="text-muted-foreground hover:text-primary transition-colors">
                  Hen Party Activities & Entertainment at Cotswold Manor Estate, Lew Bampton, Oxfordshire, OX18 2B
                </Link>
              </li>
              <li>
                <Link href="/blog/georgian-farm-house" className="text-muted-foreground hover:text-primary transition-colors">
                  Fun Hen Party Activities near Bath. Georgian Farm House and Cottages, Frome Rd, BA14.
                </Link>
              </li>
              <li>
                <Link href="/blog/petite-france" className="text-muted-foreground hover:text-primary transition-colors">
                  Hen Party Activities – Petite France – Bodkin House Hotel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
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
          </div>
        </div>
      </div>
    </footer>
  );
}

