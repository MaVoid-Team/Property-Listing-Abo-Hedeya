# frozen_string_literal: true

class PropertyImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :property_id, :image_url, :blob_url, :is_primary, :created_at

  def image_url
    if object.image.attached?
      blob_url_options = Rails.application.routes.default_url_options || { host: 'localhost', port: 3000 }
      rails_blob_url(object.image, **blob_url_options)
    else
      object.image_url
    end
  end

  def blob_url
    if object.image.attached?
      blob_url_options = Rails.application.routes.default_url_options || { host: 'localhost', port: 3000 }
      rails_blob_url(object.image, **blob_url_options)
    else
      object.blob_url
    end
  end
end

