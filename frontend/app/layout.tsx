import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const notoArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"], 
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Premium Property Listings | Find Your Dream Home",
  description:
    "Browse our collection of premium properties. Find your perfect home with detailed listings, photos, and easy inquiry process.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} ${notoArabic.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
