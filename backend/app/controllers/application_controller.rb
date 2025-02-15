class ApplicationController < ActionController::Base
  protected

  def authenticate!
    render json: { error_message: 'unauthorized' }, status: :unauthorized if current_auth.nil?

    @current_auth = current_auth
  end

  private

  def current_auth
    return @current_auth if defined? @current_auth

    jwt_token = request.headers['Authorization']
    return if jwt_token.nil?

    @current_auth = Jwt.decode(jwt_token)
  end
end
