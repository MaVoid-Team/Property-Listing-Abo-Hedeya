"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Search, MapPin, DollarSign } from "lucide-react"

export function SearchFilters() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("search")
  const [location, setLocation] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)

    router.push(`/${locale}/properties?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-card p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 border border-border rounded-lg px-4 py-3">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("location")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-3 border border-border rounded-lg px-4 py-3">
          <DollarSign className="w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            placeholder={t("minPrice")}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="flex-1 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-3 border border-border rounded-lg px-4 py-3">
          <DollarSign className="w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            placeholder={t("maxPrice")}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="flex-1 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>{t("search")}</span>
        </button>
      </div>
    </form>
  )
}
