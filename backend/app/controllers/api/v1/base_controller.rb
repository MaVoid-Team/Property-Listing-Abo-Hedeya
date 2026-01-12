# frozen_string_literal: true

module Api
  module V1
    class BaseController < ApplicationController
      before_action :authenticate_admin_user!, except: [:public_actions]

      private

      def public_actions
        []
      end

      def render_success(data, status: :ok)
        render json: data, status: status
      end

      def render_error(message, status: :unprocessable_entity)
        render json: { error: message }, status: status
      end

      def render_not_found(resource = 'Resource')
        render json: { error: "#{resource} not found" }, status: :not_found
      end
    end
  end
end

