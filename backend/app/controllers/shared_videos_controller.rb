class SharedVideosController < ApplicationController
  before_action :authenticate!, only: [:create]

  def create
    service = SharedYoutubeVideo::Create.new(@current_auth['id'], params[:url])
    service.call

    if service.success?
      render json: service.data, status: :ok
    else
      render json: { error_message: service.errors.first.message }, status: :bad_request
    end
  end
end
