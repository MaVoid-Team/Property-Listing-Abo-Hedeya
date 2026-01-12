"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react"
import { getContactInfo } from "@/lib/api/contact"
import type { ContactInfo } from "@/lib/types"

export default function ContactPage() {
  const t = useTranslations("contact")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchContactInfo()
  }, [])

  async function fetchContactInfo() {
    try {
      const data = await getContactInfo()
      setContactInfo(data)
    } catch (err) {
      console.error("Error fetching contact info:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const businessHoursLines = contactInfo?.hours
    ? contactInfo.hours.split("\n")
    : ["Mon-Fri: 9AM-6PM", "Sat: 10AM-4PM", "Sun: Closed"]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">{t("title")}</h1>
          <p className="text-xl text-muted-foreground text-balance">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">{t("contactInfo")}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("email")}</h3>
                    <a
                      href={`mailto:${contactInfo?.email || "info@propertyhub.com"}`}
                      className="text-muted-foreground hover:text-primary transition"
                    >
                      {contactInfo?.email || "info@propertyhub.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("phone")}</h3>
                    <a
                      href={`tel:${contactInfo?.phone || "+1234567890"}`}
                      className="text-muted-foreground hover:text-primary transition"
                    >
                      {contactInfo?.phone || "+1 (234) 567-8900"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("address")}</h3>
                    <p className="text-muted-foreground">
                      {contactInfo?.address || "123 Business Street\nCity, State 12345\nUnited States"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">{t("businessHours")}</h3>
              <div className="space-y-2 text-muted-foreground">
                {businessHoursLines.map((line, idx) => (
                  <div key={idx} className="text-sm">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("sendMessage")}</h2>

            {submitted && (
              <div className="bg-green-100/50 text-green-700 rounded-lg p-4 mb-6 flex items-start gap-3">
                <span className="text-xl">✓</span>
                <div>
                  <p className="font-semibold">{t("messageSent")}</p>
                  <p className="text-sm">{t("messageSuccess")}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("name")} *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t("name")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("email")} *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+1 (234) 567-8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t("yourMessage")} *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {loading ? t("sending") : t("send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
