# frozen_string_literal: true

module Api
  module V1
    class InquiriesController < BaseController
      before_action :authenticate_admin_user!, except: [:create]
      before_action :set_inquiry, only: [:show]

      # GET /api/v1/inquiries
      def index
        @inquiries = Inquiry.includes(:property).recent
        render json: @inquiries, each_serializer: InquirySerializer, include: ['property']
      end

      # GET /api/v1/inquiries/:id
      def show
        render json: @inquiry, serializer: InquirySerializer, include: ['property']
      end

      # POST /api/v1/inquiries
      def create
        @inquiry = Inquiry.new(inquiry_params)

        if @inquiry.save
          render json: @inquiry, serializer: InquirySerializer, status: :created
        else
          render json: { errors: @inquiry.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_inquiry
        @inquiry = Inquiry.find(params[:id])
      end

      def inquiry_params
        params.require(:inquiry).permit(:property_id, :name, :email, :phone, :message)
      end
    end
  end
end

