# frozen_string_literal: true

class CreatePropertyImages < ActiveRecord::Migration[8.1]
  def change
    create_table :property_images, id: :uuid do |t|
      t.references :property, null: false, type: :uuid, foreign_key: true
      t.boolean :is_primary, null: false, default: false
      t.string :image_url  # For storing external URLs (backward compatibility)
      t.string :blob_url   # For storing blob URLs

      t.timestamps
    end

    add_index :property_images, [:property_id, :is_primary]
  end
end
