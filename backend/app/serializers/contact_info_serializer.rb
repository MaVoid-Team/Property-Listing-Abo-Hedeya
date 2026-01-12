# frozen_string_literal: true

class ContactInfoSerializer < ActiveModel::Serializer
  attributes :id, :phone, :email, :address, :hours, :updated_at
end

