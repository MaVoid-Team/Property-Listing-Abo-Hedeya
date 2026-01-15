"use client"

import type { Inquiry } from "@/lib/types"
import { Mail, Phone, MessageSquare } from "lucide-react"

interface AdminInquiryListProps {
  inquiries: Inquiry[]
}

export function AdminInquiryList({ inquiries }: AdminInquiryListProps) {
  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">No inquiries yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{inquiry.name}</h3>
              <p className="text-sm text-muted-foreground">{new Date(inquiry.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${inquiry.email}`} className="hover:text-primary">
                {inquiry.email}
              </a>
            </div>
            {inquiry.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href={`tel:${inquiry.phone}`} className="hover:text-primary">
                  {inquiry.phone}
                </a>
              </div>
            )}
          </div>

          {inquiry.message && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </div>
              <p className="text-muted-foreground text-sm whitespace-pre-wrap">{inquiry.message}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
