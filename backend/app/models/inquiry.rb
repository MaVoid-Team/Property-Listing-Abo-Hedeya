# frozen_string_literal: true

class Inquiry < ApplicationRecord
  # Associations
  belongs_to :property

  # Validations
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :property, presence: true

  # Scopes
  scope :recent, -> { order(created_at: :desc) }
end
