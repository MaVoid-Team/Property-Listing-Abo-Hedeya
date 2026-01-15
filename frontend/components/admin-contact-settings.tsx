"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getContactInfo, updateContactInfo } from "@/lib/api/contact"
import { ApiError } from "@/lib/api/client"
import type { ContactInfo } from "@/lib/types"

export function AdminContactSettings() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    hours: "",
  })

  useEffect(() => {
    fetchContactInfo()
  }, [])

  async function fetchContactInfo() {
    try {
      setLoading(true)
      const data = await getContactInfo()
      setContactInfo(data)
      setFormData({
        phone: data.phone,
        email: data.email,
        address: data.address,
        hours: data.hours || "",
      })
    } catch (err) {
      console.error("Error fetching contact info:", err)
      setError("Failed to load contact information")
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const updated = await updateContactInfo(formData)
      setContactInfo(updated)
      setSuccess("Contact information updated successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        console.error("Error saving contact info:", err)
        setError("An error occurred while saving")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading contact information...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Manage the contact details displayed on the website</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">{success}</div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Business Hours</label>
            <Textarea
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              placeholder="Mon-Fri: 9AM-6PM&#10;Sat: 10AM-4PM&#10;Sun: Closed"
              rows={4}
            />
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
