"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { PropertyGrid } from "@/components/property-grid"
import type { Property } from "@/lib/types"
import { getProperties } from "@/lib/api/properties"
import Link from "next/link"

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const t = useTranslations("properties")
  const locale = useLocale()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      
      try {
        const location = searchParams.get("location") || undefined
        const minPrice = searchParams.get("minPrice")
        const maxPrice = searchParams.get("maxPrice")
        const propertyType = searchParams.get("type") || undefined

        const data = await getProperties({
          available: true,
          location,
          property_type: propertyType,
          min_price: minPrice ? Number.parseFloat(minPrice) : undefined,
          max_price: maxPrice ? Number.parseFloat(maxPrice) : undefined,
        })

        setProperties(data || [])
      } catch (error) {
        console.error("Error fetching properties:", error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">{t("title")}</h1>
        <p className="text-lg text-muted-foreground mb-12 text-balance">
          {loading ? t("loading") : t("found", { count: properties.length })}
        </p>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-muted-foreground">{t("loading")}</div>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-muted-foreground text-lg mb-4">{t("noFound")}</p>
              <Link href={`/${locale}`} className="text-primary hover:underline">
                {t("goBackHome")}
              </Link>
            </div>
          </div>
        ) : (
          <PropertyGrid properties={properties} />
        )}
      </div>
    </main>
  )
}
