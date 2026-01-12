# frozen_string_literal: true

class AdminUser < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # Associations
  has_many :properties, dependent: :nullify

  # Validations
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :is_admin, inclusion: { in: [true, false] }

  # Scopes
  scope :admins, -> { where(is_admin: true) }

  # Default values
  attribute :is_admin, :boolean, default: true

  # Generate JTI before create
  before_create :generate_jti

  private

  def generate_jti
    self.jti ||= SecureRandom.uuid
  end
end
