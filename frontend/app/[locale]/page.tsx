"use client"

import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { PropertyGrid } from "@/components/property-grid"
import { SearchFilters } from "@/components/search-filters"
import { getProperties, type PropertyWithImages } from "@/lib/api/properties"
import Link from "next/link"

export default function Home() {
  const t = useTranslations("home")
  const locale = useLocale()
  const [properties, setProperties] = useState<PropertyWithImages[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties({ available: true })
        // Sort by featured first, then by created_at
        const sorted = (data || []).sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
        setProperties(sorted)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">{t("title")}</h1>
            <p className="text-xl text-muted-foreground text-balance">
              {t("subtitle")}
            </p>
          </div>
          <SearchFilters />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-balance">{t("featuredProperties")}</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("loadingProperties")}</p>
            </div>
          ) : properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noProperties")}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">{t("lookingForSpecific")}</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            {t("browseListings")}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/${locale}/properties`}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              {t("viewAllProperties")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
