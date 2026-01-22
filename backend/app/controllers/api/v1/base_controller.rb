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

      def render_paginated(collection, serializer: nil, include: [])
        pagy, paginated = pagy(collection, page: params[:page], items: params[:per_page] || 25)
        
        serialized_data = if serializer
          ActiveModel::Serializer::CollectionSerializer.new(
            paginated,
            serializer: serializer,
            include: include
          ).as_json
        else
          paginated.as_json
        end
        
        render json: {
          data: serialized_data,
          meta: {
            current_page: pagy.page,
            per_page: pagy.limit,
            total_pages: pagy.pages,
            total_count: pagy.count
          }
        }
      end
    end
  end
end

