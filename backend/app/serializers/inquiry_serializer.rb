# frozen_string_literal: true

class InquirySerializer < ActiveModel::Serializer
  attributes :id, :property_id, :name, :email, :phone, :message, :created_at

  belongs_to :property, optional: true
end

