"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en"
    
    // Remove the current locale from pathname and prepend new locale
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    
    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition text-sm font-medium"
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">
        {locale === "en" ? "العربية" : "English"}
      </span>
      <span className="sm:hidden">
        {locale === "en" ? "AR" : "EN"}
      </span>
    </button>
  )
}

