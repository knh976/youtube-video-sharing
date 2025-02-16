class SharedVideosController < ApplicationController
  before_action :authenticate!, only: [:create]

  def create
    service = SharedYoutubeVideo::Create.new(@current_auth['id'], params[:url])
    service.call

    if service.success?
      SharedVideosNotificationsJob.perform_async(service.data.id)
      render json: service.data, status: :ok
    else
      render json: { error_message: service.errors.first.message }, status: :bad_request
    end
  end

  def index
    service = SharedYoutubeVideo::GetList.new
    service.call

    render json: service.data, each_serializer: ShareVideoSerializer, status: :ok
  end
end
