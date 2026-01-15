"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, Phone, User } from "lucide-react"
import { createInquiry } from "@/lib/api/inquiries"
import { ApiError } from "@/lib/api/client"

interface InquiryFormProps {
  propertyId: string
  propertyTitle: string
}

export function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const t = useTranslations("inquiry")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await createInquiry({
        property_id: propertyId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
      })

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError(t("error"))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-accent mb-2">✓</div>
        <p className="text-foreground font-semibold mb-2">{t("success")}</p>
        <p className="text-muted-foreground text-sm">{t("successMessage")}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>}

      <div className="relative">
        <User className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
        <input
          type="text"
          name="name"
          placeholder={t("yourName")}
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
        <input
          type="email"
          name="email"
          placeholder={t("yourEmail")}
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
        <input
          type="tel"
          name="phone"
          placeholder={t("phoneOptional")}
          value={formData.phone}
          onChange={handleChange}
          className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <textarea
        name="message"
        placeholder={t("message")}
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
      >
        {loading ? t("submitting") : t("submit")}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        {t("privacyNote")}
      </p>
    </form>
  )
}
