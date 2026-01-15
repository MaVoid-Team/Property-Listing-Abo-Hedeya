"use client"

import Link from "next/link"
import Image from "next/image"
import { Bed, Bath, Ruler as Ruler2 } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import type { Property, PropertyImage } from "@/lib/types"

interface PropertyWithImages extends Property {
  property_images?: PropertyImage[]
}

interface PropertyGridProps {
  properties: PropertyWithImages[]
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const t = useTranslations("properties")
  const locale = useLocale()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => {
        // Find primary image first, fallback to first image
        const primaryImage = property.property_images?.find(img => img.is_primary) || property.property_images?.[0]
        const imageUrl = primaryImage?.blob_url || primaryImage?.image_url || "/placeholder.svg?height=300&width=400"

        return (
          <Link href={`/${locale}/properties/${property.id}`} key={property.id}>
            <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
              {/* Image Container */}
              <div className="relative w-full h-56 bg-muted overflow-hidden">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {property.featured && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {t("featured")}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-2xl font-bold text-primary mb-2">${property.price.toLocaleString()}</p>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">{property.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{property.address}</p>
                </div>

                {/* Features */}
                <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                  {property.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} {t("beds")}</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms} {t("baths")}</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-1">
                      <Ruler2 className="w-4 h-4" />
                      <span>{property.area.toLocaleString()} {t("sqft")}</span>
                    </div>
                  )}
                </div>

                {/* Property Type */}
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t(`propertyTypes.${property.property_type}`)}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
