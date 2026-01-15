# frozen_string_literal: true

class Property < ApplicationRecord
  # Constants
  PROPERTY_TYPES = %w[house apartment condo townhouse land commercial].freeze
  STATUSES = %w[available pending sold rented].freeze

  # Associations
  belongs_to :admin_user, optional: true
  belongs_to :category, optional: true
  has_many :property_images, dependent: :destroy
  has_many :inquiries, dependent: :destroy

  # Validations
  validates :title, presence: true
  validates :address, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :property_type, presence: true, inclusion: { in: PROPERTY_TYPES }
  validates :status, presence: true, inclusion: { in: STATUSES }
  validates :bedrooms, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :bathrooms, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :area, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  # Scopes
  scope :available, -> { where(status: 'available') }
  scope :featured, -> { where(featured: true) }
  scope :by_type, ->(type) { where(property_type: type) if type.present? }
  scope :by_price_range, ->(min, max) {
    scope = all
    scope = scope.where('price >= ?', min) if min.present?
    scope = scope.where('price <= ?', max) if max.present?
    scope
  }
  scope :by_location, ->(location) { where('address ILIKE ?', "%#{location}%") if location.present? }

  # Returns the primary image or nil
  def primary_image
    property_images.find_by(is_primary: true) || property_images.first
  end
end
