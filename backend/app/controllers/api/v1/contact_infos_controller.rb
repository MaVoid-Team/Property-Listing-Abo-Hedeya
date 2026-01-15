# frozen_string_literal: true

module Api
  module V1
    class ContactInfosController < BaseController
      before_action :authenticate_admin_user!, only: [:update]

      # GET /api/v1/contact_info
      def show
        @contact_info = ContactInfo.instance
        render json: @contact_info, serializer: ContactInfoSerializer
      end

      # PATCH/PUT /api/v1/contact_info
      def update
        @contact_info = ContactInfo.instance

        if @contact_info.update(contact_info_params)
          render json: @contact_info, serializer: ContactInfoSerializer
        else
          render json: { errors: @contact_info.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def contact_info_params
        params.require(:contact_info).permit(:phone, :email, :address, :hours)
      end
    end
  end
end

