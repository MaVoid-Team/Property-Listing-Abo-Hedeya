# frozen_string_literal: true

class PropertyImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :property_id, :image_url, :blob_url, :is_primary, :created_at

  def image_url
    if object.image.attached?
      build_blob_url(object.image)
    else
      object.image_url
    end
  end

  def blob_url
    if object.image.attached?
      build_blob_url(object.image)
    else
      object.blob_url
    end
  end

  private

  def build_blob_url(attachment)
    # Build the URL manually to avoid action_mailer dependency in API-only apps
    host = Rails.application.routes.default_url_options[:host] || 'localhost'
    port = Rails.application.routes.default_url_options[:port]
    protocol = Rails.application.routes.default_url_options[:protocol] || 'http'
    
    base_url = "#{protocol}://#{host}"
    base_url += ":#{port}" if port
    
    path = rails_blob_path(attachment, only_path: true)
    "#{base_url}#{path}"
  rescue StandardError => e
    Rails.logger.error("Failed to generate blob URL: #{e.message}")
    nil
  end
end

