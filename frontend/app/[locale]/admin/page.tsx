"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import type { Property, Inquiry } from "@/lib/types"
import { AdminPropertyList } from "@/components/admin-property-list"
import { AdminInquiryList } from "@/components/admin-inquiry-list"
import { AdminContactSettings } from "@/components/admin-contact-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, LogOut } from "lucide-react"
import Link from "next/link"
import { getProperties } from "@/lib/api/properties"
import { getInquiries } from "@/lib/api/inquiries"
import { logout, isAuthenticated } from "@/lib/api/auth"

export default function AdminPage() {
  const t = useTranslations("admin")
  const tCommon = useTranslations("common")
  const locale = useLocale()
  const [properties, setProperties] = useState<Property[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(`/${locale}/admin-login`)
      return
    }
    setIsAuth(true)
    fetchData()
  }, [router, locale])

  async function fetchData() {
    try {
      const [propsData, inquiriesData] = await Promise.all([
        getProperties(),
        getInquiries(),
      ])

      setProperties(propsData || [])
      setInquiries(inquiriesData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      // If unauthorized, redirect to login
      if ((error as Error).message?.includes('401') || (error as Error).message?.includes('Unauthorized')) {
        router.push(`/${locale}/admin-login`)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await logout()
    router.push(`/${locale}/admin-login`)
  }

  function handlePropertyDeleted() {
    fetchData()
  }

  if (!isAuth) {
    return null
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">{tCommon("loading")}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/${locale}/list-property`}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold"
            >
              <Plus className="w-5 h-5" />
              {t("listNewProperty")}
            </Link>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              {t("logout")}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="properties" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">{t("properties")} ({properties.length})</TabsTrigger>
            <TabsTrigger value="inquiries">{t("inquiries")} ({inquiries.length})</TabsTrigger>
            <TabsTrigger value="contact">{t("contactInfo")}</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="mt-6">
            <AdminPropertyList properties={properties} onPropertyDeleted={handlePropertyDeleted} />
          </TabsContent>

          <TabsContent value="inquiries" className="mt-6">
            <AdminInquiryList inquiries={inquiries} />
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <AdminContactSettings />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
