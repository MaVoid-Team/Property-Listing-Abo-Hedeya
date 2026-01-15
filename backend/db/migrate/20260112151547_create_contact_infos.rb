# frozen_string_literal: true

class CreateContactInfos < ActiveRecord::Migration[8.1]
  def change
    create_table :contact_infos, id: :uuid do |t|
      t.string :phone, null: false
      t.string :email, null: false
      t.string :address, null: false
      t.text :hours

      t.timestamps
    end
  end
end
