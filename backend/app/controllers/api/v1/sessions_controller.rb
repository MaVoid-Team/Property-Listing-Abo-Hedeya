# frozen_string_literal: true

module Api
  module V1
    class SessionsController < Devise::SessionsController
      respond_to :json

      # POST /api/v1/login
      def create
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        respond_with(resource)
      end

      # POST /api/v1/logout
      def destroy
        signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
        respond_to_on_destroy
      end

      private

      def respond_with(resource, _opts = {})
        if resource.persisted?
          # Generate JWT token manually to include in response body
          token = generate_jwt_token(resource)
          
          render json: {
            success: true,
            message: 'Login successful',
            token: token,
            admin: {
              id: resource.id,
              email: resource.email,
              is_admin: resource.is_admin
            }
          }, status: :ok
        else
          render json: {
            success: false,
            message: 'Invalid credentials'
          }, status: :unauthorized
        end
      end

      def generate_jwt_token(resource)
        # Generate JWT token matching Devise JWT's format
        # This ensures the token works with Devise JWT authentication
        payload = {
          sub: resource.id.to_s,
          scp: 'admin_user',
          jti: resource.jti,
          exp: (Time.now + 24.hours).to_i
        }
        
        # Use the same secret as configured in Devise JWT
        secret = ENV.fetch('DEVISE_JWT_SECRET_KEY') { Rails.application.credentials.secret_key_base }
        require 'jwt'
        JWT.encode(payload, secret, 'HS256')
      end

      def respond_to_on_destroy
        if request.headers['Authorization'].present?
          render json: {
            success: true,
            message: 'Logged out successfully'
          }, status: :ok
        else
          render json: {
            success: false,
            message: 'No active session'
          }, status: :unauthorized
        end
      end

      def auth_options
        { scope: resource_name, recall: "#{controller_path}#new" }
      end

      def resource_name
        :admin_user
      end

      def devise_mapping
        @devise_mapping ||= Devise.mappings[:admin_user]
      end
    end
  end
end
