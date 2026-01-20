# frozen_string_literal: true

module Api
  module V1
    class PropertiesController < BaseController
      before_action :authenticate_admin_user!, except: [:index, :show]
      before_action :set_property, only: [:show, :update, :destroy, :upload_image]

      # GET /api/v1/properties
      def index
        @properties = Property.includes(:property_images, :category)

        # Apply filters
        @properties = @properties.available if params[:available] == 'true'
        @properties = @properties.featured if params[:featured] == 'true'
        @properties = @properties.by_type(params[:property_type]) if params[:property_type].present?
        @properties = @properties.by_location(params[:location]) if params[:location].present?
        @properties = @properties.by_price_range(params[:min_price], params[:max_price])

        @properties = @properties.order(created_at: :desc)

        render_paginated(@properties, serializer: PropertySerializer, include: ['property_images'])
      end

      # GET /api/v1/properties/:id
      def show
        render json: @property, serializer: PropertySerializer, include: ['property_images', 'category']
      end

      # POST /api/v1/properties
      def create
        @property = Property.new(property_params)
        @property.admin_user = current_admin_user

        if @property.save
          render json: @property, serializer: PropertySerializer, status: :created
        else
          render json: { errors: @property.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/properties/:id
      def update
        if @property.update(property_params)
          render json: @property, serializer: PropertySerializer
        else
          render json: { errors: @property.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/properties/:id
      def destroy
        @property.destroy
        head :no_content
      end

      # POST /api/v1/properties/:id/images
      def upload_image
        if params[:image].blank?
          return render json: { error: 'No image provided' }, status: :unprocessable_entity
        end

        property_image = @property.property_images.build(
          is_primary: @property.property_images.empty? || params[:is_primary] == 'true'
        )
        property_image.image.attach(params[:image])

        if property_image.save
          # If this is set as primary, unset other primary images
          if property_image.is_primary
            @property.property_images.where.not(id: property_image.id).update_all(is_primary: false)
          end

          render json: property_image, serializer: PropertyImageSerializer, status: :created
        else
          render json: { errors: property_image.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_property
        @property = Property.find(params[:id])
      end

      def property_params
        params.require(:property).permit(
          :title, :description, :address, :price, :bedrooms, :bathrooms,
          :area, :property_type, :status, :featured, :category_id
        )
      end
    end
  end
end

