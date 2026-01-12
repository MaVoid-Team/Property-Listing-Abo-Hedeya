# frozen_string_literal: true

module Api
  module V1
    class PropertyImagesController < BaseController
      before_action :authenticate_admin_user!
      before_action :set_property_image, only: [:destroy]

      # DELETE /api/v1/property_images/:id
      def destroy
        @property_image.destroy
        head :no_content
      end

      private

      def set_property_image
        @property_image = PropertyImage.find(params[:id])
      end
    end
  end
end

