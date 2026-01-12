# frozen_string_literal: true

class CreateInquiries < ActiveRecord::Migration[8.1]
  def change
    create_table :inquiries, id: :uuid do |t|
      t.references :property, null: false, type: :uuid, foreign_key: true
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone
      t.text :message

      t.timestamps
    end

    add_index :inquiries, :email
    add_index :inquiries, :created_at
  end
end
