"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "Toutes nos box", href: "/shop" },
    { name: "Collection Femme", href: "/shop?category=femme" },
    { name: "Collection Homme", href: "/shop?category=homme" },
    { name: "Bouquets Argent", href: "/shop?category=bouquets" },
    { name: "Personnalisation", href: "/shop" }
  ],
  about: [
    { name: "Notre histoire", href: "/" },
    { name: "Nos valeurs", href: "/" },
    { name: "Engagement qualité", href: "/" },
    { name: "Blog", href: "/" }
  ],
  support: [
    { name: "Nous contacter", href: "/" },
    { name: "FAQ", href: "/" },
    { name: "Livraison", href: "/" },
    { name: "Retours", href: "/" }
  ]
}

export function Footer() {
  return (
    <footer className="bg-[#2B160C] pt-20 pb-10 relative overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="font-serif text-[200px] sm:text-[200px] md:text-[400px] lg:text-[400px] xl:text-[400px] font-bold text-[#EABC3D]/10 whitespace-nowrap leading-none">
          Sys'y Box Events
        </span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-serif text-3xl text-[#FCF8EF] mb-4">Sys'y Box Events</h2>
            <p className="text-sm text-[#EABC3D] leading-relaxed mb-6">
              Nous imaginons des événements élégants, chaleureux et inoubliables, pensés pour vous.
            </p>
            <div className="flex gap-4">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FCF8EF] flex items-center justify-center text-[#572D15]/60 hover:text-[#572D15] boty-transition boty-shadow"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FCF8EF] flex items-center justify-center text-[#572D15]/60 hover:text-[#572D15] boty-transition boty-shadow"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FCF8EF] flex items-center justify-center text-[#572D15]/60 hover:text-[#572D15] boty-transition boty-shadow"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-[#FCF8EF] mb-4">Boutique</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#EABC3D] hover:text-[#FCF8EF] boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-medium text-[#FCF8EF] mb-4">À propos</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#EABC3D] hover:text-[#FCF8EF] boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-medium text-[#FCF8EF] mb-4">Aide</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#EABC3D] hover:text-[#FCF8EF] boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#C8982C]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#EABC3D]">
              © {new Date().getFullYear()} Sys'y Box Events. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-sm text-[#EABC3D] hover:text-[#FCF8EF] boty-transition">
                Politique de confidentialité
              </Link>
              <Link href="/" className="text-sm text-[#EABC3D] hover:text-[#FCF8EF] boty-transition">
                Conditions générales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
