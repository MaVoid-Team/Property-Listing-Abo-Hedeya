# frozen_string_literal: true

Rails.application.routes.draw do
  # Health check endpoint
  get "up" => "rails/health#show", as: :rails_health_check

  # API v1 routes
  namespace :api do
    namespace :v1 do
      # Authentication - custom routes for JWT
      post 'login', to: 'sessions#create'
      post 'logout', to: 'sessions#destroy'

      # Properties
      resources :properties do
        member do
          post :images, to: 'properties#upload_image'
        end
      end

      # Property Images
      resources :property_images, only: [:destroy]

      # Categories
      resources :categories, only: [:index, :show, :create, :update, :destroy]

      # Inquiries
      resources :inquiries, only: [:index, :create, :show]

      # Contact Info
      resource :contact_info, only: [:show, :update]
    end
  end

  # Devise routes (needed for JWT to work properly)
  devise_for :admin_users, skip: [:sessions, :registrations, :passwords]
end
