# frozen_string_literal: true

class ContactInfo < ApplicationRecord
  # Validations
  validates :phone, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :address, presence: true

  # Singleton pattern - only one contact info record
  def self.instance
    first_or_create!(
      phone: '+1 (555) 123-4567',
      email: 'info@propertylistings.com',
      address: '123 Business Ave, Suite 100',
      hours: 'Mon-Fri: 9AM-6PM'
    )
  end
end
