# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_01_12_151723) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.uuid "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.boolean "is_admin", default: true, null: false
    t.string "jti", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["jti"], name: "index_admin_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "contact_infos", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "address", null: false
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.text "hours"
    t.string "phone", null: false
    t.datetime "updated_at", null: false
  end

  create_table "inquiries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.text "message"
    t.string "name", null: false
    t.string "phone"
    t.uuid "property_id", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_inquiries_on_created_at"
    t.index ["email"], name: "index_inquiries_on_email"
    t.index ["property_id"], name: "index_inquiries_on_property_id"
  end

  create_table "properties", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "address", null: false
    t.uuid "admin_user_id"
    t.decimal "area", precision: 10, scale: 2
    t.integer "bathrooms"
    t.integer "bedrooms"
    t.uuid "category_id"
    t.datetime "created_at", null: false
    t.text "description"
    t.boolean "featured", default: false, null: false
    t.decimal "price", precision: 15, scale: 2, null: false
    t.string "property_type", default: "house", null: false
    t.string "status", default: "available", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_user_id"], name: "index_properties_on_admin_user_id"
    t.index ["category_id"], name: "index_properties_on_category_id"
    t.index ["featured"], name: "index_properties_on_featured"
    t.index ["price"], name: "index_properties_on_price"
    t.index ["property_type"], name: "index_properties_on_property_type"
    t.index ["status"], name: "index_properties_on_status"
  end

  create_table "property_images", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "blob_url"
    t.datetime "created_at", null: false
    t.string "image_url"
    t.boolean "is_primary", default: false, null: false
    t.uuid "property_id", null: false
    t.datetime "updated_at", null: false
    t.index ["property_id", "is_primary"], name: "index_property_images_on_property_id_and_is_primary"
    t.index ["property_id"], name: "index_property_images_on_property_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "inquiries", "properties"
  add_foreign_key "properties", "admin_users"
  add_foreign_key "properties", "categories"
  add_foreign_key "property_images", "properties"
end
