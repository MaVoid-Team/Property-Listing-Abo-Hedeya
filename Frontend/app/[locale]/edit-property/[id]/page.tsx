"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import type { Property, PropertyImage } from "@/lib/types"
import { AlertCircle, Loader2, Upload, X, Trash2 } from "lucide-react"
import Image from "next/image"
import { getProperty, updateProperty, uploadPropertyImage, deletePropertyImage } from "@/lib/api/properties"
import { isAuthenticated } from "@/lib/api/auth"
import { ApiError } from "@/lib/api/client"

export default function EditPropertyPage() {
  const params = useParams()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("editProperty")
  const tList = useTranslations("listProperty")
  const tProps = useTranslations("properties")
  const tDetail = useTranslations("propertyDetail")
  const propertyId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [property, setProperty] = useState<Property | null>(null)
  const [images, setImages] = useState<PropertyImage[]>([])
  const [newImages, setNewImages] = useState<{ file: File; preview: string }[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    property_type: "house",
    status: "available",
  })

  // Check auth and fetch property data
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(`/${locale}/admin-login`)
      return
    }

    const fetchProperty = async () => {
      try {
        const data = await getProperty(propertyId)
        
        setProperty(data)
        setFormData({
          title: data.title,
          description: data.description || "",
          address: data.address,
          price: data.price.toString(),
          bedrooms: data.bedrooms?.toString() || "",
          bathrooms: data.bathrooms?.toString() || "",
          area: data.area?.toString() || "",
          property_type: data.property_type,
          status: data.status,
        })

        if (data.property_images) {
          setImages(data.property_images)
        }
      } catch (err) {
        console.error("Error fetching property:", err)
        setError("Failed to load property")
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId, router, locale])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const preview = URL.createObjectURL(file)
      setNewImages((prev) => [...prev, { file, preview }])
    })
  }

  const removeNewImage = (index: number) => {
    setNewImages((prev) => {
      const newArray = [...prev]
      URL.revokeObjectURL(newArray[index].preview)
      newArray.splice(index, 1)
      return newArray
    })
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm(t("removeImage") + "?")) return

    try {
      await deletePropertyImage(imageId)
      setImages((prev) => prev.filter((img) => img.id !== imageId))
    } catch (err) {
      setError("Failed to delete image")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess(false)

    try {
      // Update property via Rails API
      await updateProperty(propertyId, {
        title: formData.title,
        description: formData.description,
        address: formData.address,
        price: Number.parseFloat(formData.price),
        bedrooms: formData.bedrooms ? Number.parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? Number.parseInt(formData.bathrooms) : undefined,
        area: formData.area ? Number.parseFloat(formData.area) : undefined,
        property_type: formData.property_type,
        status: formData.status,
      })

      // Upload new images
      if (newImages.length > 0) {
        setUploadingImages(true)
        for (const { file } of newImages) {
          const newImage = await uploadPropertyImage(propertyId, file, false)
          setImages((prev) => [...prev, newImage])
        }
        setUploadingImages(false)
        setNewImages([])
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError("An error occurred. Please try again.")
        console.error(err)
      }
    } finally {
      setSaving(false)
      setUploadingImages(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    )
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">{tProps("noFound")}</p>
        </div>
      </main>
    )
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

          {success && (
            <div className="bg-green-100/50 border border-green-200/50 text-green-700 rounded-lg p-4">
              {t("updateProperty")} ✓
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">{tList("basicInfo")}</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{tList("propertyTitle")} *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{tList("description")}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{tList("address")} *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{tList("price")} *</label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{tDetail("status")} *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="available">{tDetail("available")}</option>
                  <option value="sold">{tDetail("sold")}</option>
                  <option value="pending">{tDetail("pending")}</option>
                  <option value="rented">{tDetail("rented")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">{tList("propertyDetails")}</h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{tList("bedrooms")}</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{tList("bathrooms")}</label>
                <input
                  type="number"
                  name="bathrooms"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{tList("area")}</label>
                <input
                  type="number"
                  name="area"
                  step="0.01"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Current Images */}
          {images.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">{t("currentImages")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative h-24 rounded-lg overflow-hidden border border-border group">
                    <Image
                      src={img.blob_url || img.image_url || "/placeholder.svg"}
                      alt="Property"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.id)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">{t("addMoreImages")}</h2>

            <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition bg-muted/30">
              <div className="text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{tList("clickToUpload")}</p>
                <p className="text-xs text-muted-foreground">{tList("imageFormats")}</p>
              </div>
              <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>

            {newImages.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tList("imagesSelected", { count: newImages.length })}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {newImages.map((img, index) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={img.preview || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
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
            disabled={saving || uploadingImages}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving || uploadingImages ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {uploadingImages ? tList("uploadingImages") : t("updating")}
              </>
            ) : (
              t("updateProperty")
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
