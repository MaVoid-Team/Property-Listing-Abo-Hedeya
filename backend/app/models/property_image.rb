# frozen_string_literal: true

class PropertyImage < ApplicationRecord
  # Associations
  belongs_to :property
  has_one_attached :image

  # Validations
  validates :property, presence: true
  validate :image_presence

  # Scopes
  scope :primary, -> { where(is_primary: true) }

  # Callbacks
  after_destroy :purge_image

  # Returns the URL for the image
  def url
    if image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true)
    else
      blob_url || image_url
    end
  end

  private

  def image_presence
    return if image.attached? || blob_url.present? || image_url.present?

    errors.add(:image, 'must be attached or have a URL')
  end

  def purge_image
    image.purge if image.attached?
  end
end
