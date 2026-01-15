# frozen_string_literal: true

class PropertySerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :address, :price, :bedrooms, :bathrooms,
             :area, :property_type, :status, :featured, :created_at, :updated_at,
             :created_by

  has_many :property_images
  belongs_to :category, optional: true

  def created_by
    object.admin_user_id
  end

  def price
    object.price.to_f
  end

  def area
    object.area&.to_f
  end
end

