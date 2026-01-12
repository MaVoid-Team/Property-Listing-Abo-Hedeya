"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { AlertCircle, Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { createProperty, uploadPropertyImage } from "@/lib/api/properties"
import { isAuthenticated } from "@/lib/api/auth"
import { ApiError } from "@/lib/api/client"

export default function ListPropertyPage() {
  const t = useTranslations("listProperty")
  const tProps = useTranslations("properties")
  const locale = useLocale()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [uploadingImages, setUploadingImages] = useState(false)
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    property_type: "house",
  })

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push(`/${locale}/admin-login`)
    }
  }, [router, locale])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const preview = URL.createObjectURL(file)
      setImages((prev) => [...prev, { file, preview }])
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Create property via Rails API
      const property = await createProperty({
        title: formData.title,
        description: formData.description,
        address: formData.address,
        price: Number.parseFloat(formData.price),
        bedrooms: formData.bedrooms ? Number.parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? Number.parseInt(formData.bathrooms) : undefined,
        area: formData.area ? Number.parseFloat(formData.area) : undefined,
        property_type: formData.property_type,
        status: "available",
      })

      const propertyId = property.id

      // Upload images
      if (images.length > 0) {
        setUploadingImages(true)
        for (let i = 0; i < images.length; i++) {
          const { file } = images[i]
          await uploadPropertyImage(propertyId, file, i === 0)
        }
        setUploadingImages(false)
      }

      router.push(`/${locale}/properties/${propertyId}`)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError("An error occurred. Please try again.")
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">{t("title")}</h1>
        <p className="text-muted-foreground mb-8">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">{t("basicInfo")}</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("propertyTitle")} *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder={t("propertyTitlePlaceholder")}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("description")}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("descriptionPlaceholder")}
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("address")} *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder={t("addressPlaceholder")}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("price")} *</label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("propertyType")} *</label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="house">{tProps("propertyTypes.house")}</option>
                  <option value="apartment">{tProps("propertyTypes.apartment")}</option>
                  <option value="condo">{tProps("propertyTypes.condo")}</option>
                  <option value="townhouse">{tProps("propertyTypes.townhouse")}</option>
                  <option value="land">{tProps("propertyTypes.land")}</option>
                  <option value="commercial">{tProps("propertyTypes.commercial")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">{t("propertyDetails")}</h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("bedrooms")}</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("bathrooms")}</label>
                <input
                  type="number"
                  name="bathrooms"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("area")}</label>
                <input
                  type="number"
                  name="area"
                  step="0.01"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">{t("images")}</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-4">{t("uploadImages")}</label>
              <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition bg-muted/30">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{t("clickToUpload")}</p>
                  <p className="text-xs text-muted-foreground">{t("imageFormats")}</p>
                </div>
                <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" />
              </label>
            </div>

            {images.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("imagesSelected", { count: images.length })}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={img.preview || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        fill
                        className="object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          {t("primary")}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-destructive/80 text-white p-1 rounded hover:bg-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || uploadingImages}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading || uploadingImages ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {uploadingImages ? t("uploadingImages") : t("creatingListing")}
              </>
            ) : (
              t("createListing")
            )}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            {t("publishNote")}
          </p>
        </form>
      </div>
    </main>
  )
}
