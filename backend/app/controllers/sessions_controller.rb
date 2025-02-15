class SessionsController < ApplicationController
  def login
    service = Auth::Login.new(
      username: params[:username],
      password: params[:password],
    )
    service.call

    if service.success?
      render json: { username: service.current_user.username, jwt: service.jwt }, status: :ok
    else
      render json: { error_message: service.errors.first.message }, status: :forbidden
    end
  end
end
