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

      # DELETE /api/v1/logout
      def destroy
        signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
        respond_to_on_destroy
      end

      private

      def respond_with(resource, _opts = {})
        if resource.persisted?
          render json: {
            success: true,
            message: 'Login successful',
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
