"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import type { Property } from "@/lib/types"
import { deleteProperty } from "@/lib/api/properties"
import { Edit2, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface AdminPropertyListProps {
  properties: Property[]
  onPropertyDeleted: () => void
}

export function AdminPropertyList({ properties, onPropertyDeleted }: AdminPropertyListProps) {
  const t = useTranslations("admin")
  const tProps = useTranslations("properties")
  const tDetail = useTranslations("propertyDetail")
  const locale = useLocale()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return

    setDeleting(id)
    try {
      await deleteProperty(id)
      onPropertyDeleted()
    } catch (error) {
      console.error("Error deleting property:", error)
      const message = error instanceof Error ? error.message : "Unknown error"
      alert(`Failed to delete property: ${message}`)
    } finally {
      setDeleting(null)
    }
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground mb-4">{t("noProperties")}</p>
        <Link href={`/${locale}/list-property`} className="text-primary hover:underline font-semibold">
          {t("listNewProperty")}
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            <th className="text-start py-4 px-6 font-semibold text-foreground">{tDetail("propertyDetails")}</th>
            <th className="text-start py-4 px-6 font-semibold text-foreground">{tProps("propertyTypes.house")}</th>
            <th className="text-start py-4 px-6 font-semibold text-foreground">{tDetail("type")}</th>
            <th className="text-start py-4 px-6 font-semibold text-foreground">{tDetail("status")}</th>
            <th className="text-end py-4 px-6 font-semibold text-foreground"></th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b border-border hover:bg-muted/30 transition">
              <td className="py-4 px-6 text-foreground font-medium">{property.title}</td>
              <td className="py-4 px-6 text-foreground font-semibold">${property.price.toLocaleString()}</td>
              <td className="py-4 px-6 text-muted-foreground">
                {tProps(`propertyTypes.${property.property_type}`)}
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === "available"
                      ? "bg-green-100/50 text-green-700"
                      : property.status === "sold"
                      ? "bg-red-100/50 text-red-700"
                      : "bg-yellow-100/50 text-yellow-700"
                  }`}
                >
                  {tDetail(property.status)}
                </span>
              </td>
              <td className="py-4 px-6 text-end flex items-center justify-end gap-2">
                <Link
                  href={`/${locale}/properties/${property.id}`}
                  className="p-2 hover:bg-muted rounded-lg transition text-muted-foreground hover:text-foreground"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/edit-property/${property.id}`}
                  className="p-2 hover:bg-muted rounded-lg transition text-muted-foreground hover:text-foreground"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(property.id)}
                  disabled={deleting === property.id}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition text-muted-foreground hover:text-destructive disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
