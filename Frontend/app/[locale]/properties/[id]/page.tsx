"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Bed, Bath, Ruler as Ruler2, MapPin, Loader2 } from "lucide-react"
import { InquiryForm } from "@/components/inquiry-form"
import { getProperty, type PropertyWithImages } from "@/lib/api/properties"

export default function PropertyPage() {
  const params = useParams()
  const propertyId = params.id as string
  const t = useTranslations("propertyDetail")
  const tProps = useTranslations("properties")
  const tCommon = useTranslations("common")
  const locale = useLocale()
  
  const [property, setProperty] = useState<PropertyWithImages | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getProperty(propertyId)
        setProperty(data)
      } catch (err) {
        console.error("Error fetching property:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    )
  }

  if (error || !property) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{tProps("noFound")}</h1>
          <Link href={`/${locale}/properties`} className="text-primary hover:underline">
            {tCommon("back")}
          </Link>
        </div>
      </main>
    )
  }

  const primaryImage = property.property_images?.find(img => img.is_primary) || property.property_images?.[0]
  const mainImageUrl = primaryImage?.blob_url || primaryImage?.image_url || "/placeholder.svg?height=600&width=1000"

  return (
    <main className="min-h-screen bg-background">
      {/* Image Gallery */}
      <div className="relative w-full h-96 md:h-[600px] bg-muted overflow-hidden">
        <Image src={mainImageUrl || "/placeholder.svg"} alt={property.title} fill className="object-cover" priority />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-2">
                {tProps(`propertyTypes.${property.property_type}`)}
              </p>
              <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="w-5 h-5" />
                <p className="text-lg">{property.address}</p>
              </div>
              <p className="text-4xl font-bold text-primary mb-8">${property.price.toLocaleString()}</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-6 mb-12 p-8 bg-card rounded-lg border border-border">
              {property.bedrooms && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bed className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                  <p className="text-muted-foreground text-sm">{t("bedrooms")}</p>
                </div>
              )}
              {property.bathrooms && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bath className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                  <p className="text-muted-foreground text-sm">{t("bathrooms")}</p>
                </div>
              )}
              {property.area && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Ruler2 className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{property.area.toLocaleString()}</p>
                  <p className="text-muted-foreground text-sm">{tProps("sqft")}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">{t("description")}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                  {property.description}
                </p>
              </div>
            )}

            {/* Additional Images */}
            {property.property_images && property.property_images.length > 1 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("location")}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.property_images.map((img) => (
                    <div key={img.id} className="relative h-48 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={img.blob_url || img.image_url || "/placeholder.svg?height=200&width=200"}
                        alt={property.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div>
            <div className="bg-card border border-border rounded-lg p-8 sticky top-8">
              <h3 className="text-xl font-bold text-foreground mb-6">{tProps("interestedInProperty")}</h3>
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
