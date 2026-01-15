# frozen_string_literal: true

class Category < ApplicationRecord
  # Associations
  has_many :properties, dependent: :nullify

  # Validations
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
