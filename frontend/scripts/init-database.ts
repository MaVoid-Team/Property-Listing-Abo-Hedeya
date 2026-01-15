/**
 * Database Initialization Script
 * Run this script to set up all database tables and initial data
 *
 * Usage: npx ts-node scripts/init-database.ts
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("[v0] Missing Supabase credentials")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function initializeDatabase() {
  console.log("[v0] Starting database initialization...")

  try {
    // Create admin_users table
    console.log("[v0] Creating admin_users table...")
    await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          is_admin BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    })

    // Create contact_info table
    console.log("[v0] Creating contact_info table...")
    await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS contact_info (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          address TEXT NOT NULL,
          hours TEXT,
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    })

    // Insert default admin user
    console.log("[v0] Inserting default admin user...")
    const { data: existingAdmin } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", "admin@propertylistings.com")
      .single()

    if (!existingAdmin) {
      await supabase.from("admin_users").insert({
        email: "admin@propertylistings.com",
        password_hash: "$2b$10$v.7EwZI1m2Ej8/bNFCi0aeJ9WjWQSW.JIrTVNLKS1hChOlkjPQU3a",
        is_admin: true,
      })
    }

    // Insert default contact info
    console.log("[v0] Inserting default contact info...")
    const { data: existingContact } = await supabase.from("contact_info").select("id").single()

    if (!existingContact) {
      await supabase.from("contact_info").insert({
        phone: "+1 (555) 123-4567",
        email: "info@propertylistings.com",
        address: "123 Business Ave, Suite 100",
        hours: "Mon-Fri: 9AM-6PM\nSat: 10AM-4PM\nSun: Closed",
      })
    }

    console.log("[v0] Database initialization completed successfully!")
    console.log("[v0] Admin credentials: admin@propertylistings.com / admin123")
  } catch (error) {
    console.error("[v0] Database initialization failed:", error)
    process.exit(1)
  }
}

initializeDatabase()
