"use client"

import { useEffect, type ReactNode } from "react"

interface LocaleProviderProps {
  locale: string
  children: ReactNode
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  useEffect(() => {
    // Set lang and dir attributes on the html element
    document.documentElement.lang = locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
    
    // Cleanup on unmount or locale change
    return () => {
      document.documentElement.lang = "en"
      document.documentElement.dir = "ltr"
    }
  }, [locale])

  return <>{children}</>
}

