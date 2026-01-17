"use client"

import Link from "next/link"
import { Home, Search, Mail } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { LanguageSwitcher } from "./language-switcher"

export function Navbar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("nav")

  // Check if current path matches (accounting for locale prefix)
  const isActive = (path: string) => {
    const localizedPath = `/${locale}${path === "/" ? "" : path}`
    return pathname === localizedPath || (path === "/" && pathname === `/${locale}`)
  }

  // Helper to create localized links
  const localizedHref = (path: string) => `/${locale}${path === "/" ? "" : path}`

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={localizedHref("/")}
          className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition"
        >
          <Home className="w-6 h-6" />
          <span>Abo Hedeya</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={localizedHref("/")}
            className={`flex items-center gap-2 transition ${isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Home className="w-4 h-4" />
            {t("home")}
          </Link>
          <Link
            href={localizedHref("/properties")}
            className={`flex items-center gap-2 transition ${isActive("/properties") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Search className="w-4 h-4" />
            {t("properties")}
          </Link>
          <Link
            href={localizedHref("/contact")}
            className={`flex items-center gap-2 transition ${isActive("/contact") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Mail className="w-4 h-4" />
            {t("contact")}
          </Link>
        </div>

        {/* CTA Buttons & Language Switcher */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={localizedHref("/admin-login")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold text-sm sm:text-base"
          >
            {t("admin")}
          </Link>
        </div>
      </div>
    </nav>
  )
}
