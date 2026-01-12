# frozen_string_literal: true

class CreateProperties < ActiveRecord::Migration[8.1]
  def change
    create_table :properties, id: :uuid do |t|
      t.string :title, null: false
      t.text :description
      t.string :address, null: false
      t.decimal :price, precision: 15, scale: 2, null: false
      t.integer :bedrooms
      t.integer :bathrooms
      t.decimal :area, precision: 10, scale: 2
      t.string :property_type, null: false, default: 'house'
      t.string :status, null: false, default: 'available'
      t.boolean :featured, null: false, default: false
      t.references :admin_user, null: true, type: :uuid, foreign_key: true
      t.references :category, null: true, type: :uuid, foreign_key: true

      t.timestamps
    end

    add_index :properties, :status
    add_index :properties, :property_type
    add_index :properties, :featured
    add_index :properties, :price
  end
end
