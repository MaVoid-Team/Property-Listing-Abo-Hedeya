import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { LocaleProvider } from "@/components/locale-provider"
import { locales, type Locale } from "@/i18n"

// Generate static params for all locales (required for static export)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Await params as required by Next.js 16
  const { locale } = await params
  
  // Validate the locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Get messages for the current locale
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleProvider locale={locale}>
        <Navbar />
        {children}
        <Analytics />
      </LocaleProvider>
    </NextIntlClientProvider>
  )
}
