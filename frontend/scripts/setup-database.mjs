#!/usr/bin/env node

/**
 * Database Setup Script
 * Run this to automatically initialize admin tables in Supabase
 * 
 * Usage: node scripts/setup-database.mjs
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n')

  try {
    // Create admin_users table
    console.log('📋 Creating admin_users table...')
    const { error: adminTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          is_admin BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
        CREATE POLICY IF NOT EXISTS "Public read admin users for login" ON admin_users FOR SELECT USING (true);
      `
    })

    if (adminTableError && adminTableError.code !== 'PGRST118') {
      // PGRST118 is "function does not exist" - exec_sql might not be available
      console.warn('⚠️  Note: Could not use rpc method. Please run SQL manually in Supabase.')
    } else if (!adminTableError) {
      console.log('✅ admin_users table created')
    }

    // Try to create contact_info table
    console.log('📋 Creating contact_info table...')
    const { error: contactTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS contact_info (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          address TEXT NOT NULL,
          hours TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
        CREATE POLICY IF NOT EXISTS "Public read contact info" ON contact_info FOR SELECT USING (true);
      `
    })

    if (!contactTableError) {
      console.log('✅ contact_info table created')
    }

    // Insert default admin user
    console.log('👤 Setting up default admin user...')
    const { error: adminInsertError } = await supabase
      .from('admin_users')
      .insert({
        email: 'admin@propertylistings.com',
        password_hash: '$2b$10$v.7EwZI1m2Ej8/bNFCi0aeJ9WjWQSW.JIrTVNLKS1hChOlkjPQU3a',
        is_admin: true
      })
      .select()

    if (adminInsertError && !adminInsertError.message.includes('unique constraint')) {
      console.error('❌ Error inserting admin user:', adminInsertError.message)
    } else {
      console.log('✅ Default admin user ready')
      console.log('   Email: admin@propertylistings.com')
      console.log('   Password: admin123')
    }

    // Insert default contact info
    console.log('📞 Setting up contact information...')
    const { error: contactInsertError } = await supabase
      .from('contact_info')
      .insert({
        phone: '+1 (555) 123-4567',
        email: 'info@propertylistings.com',
        address: '123 Business Ave, Suite 100',
        hours: 'Mon-Fri: 9AM-6PM\nSat: 10AM-4PM\nSun: Closed'
      })
      .select()

    if (contactInsertError && !contactInsertError.message.includes('unique constraint')) {
      console.error('❌ Error inserting contact info:', contactInsertError.message)
    } else {
      console.log('✅ Contact information ready')
    }

    console.log('\n✨ Database setup complete!\n')
    console.log('📖 Next steps:')
    console.log('1. Go to https://your-app.vercel.app/admin-login')
    console.log('2. Login with: admin@propertylistings.com / admin123')
    console.log('3. Start managing your properties!\n')

  } catch (error) {
    console.error('❌ Setup failed:', error instanceof Error ? error.message : String(error))
    console.error('\n⚠️  If you see "function does not exist", follow these manual steps:')
    console.error('1. Go to https://app.supabase.com')
    console.error('2. Select your project')
    console.error('3. Click SQL Editor > New Query')
    console.error('4. Copy the contents of: scripts/03-setup-admin-tables.sql')
    console.error('5. Run the query\n')
    process.exit(1)
  }
}

setupDatabase()
