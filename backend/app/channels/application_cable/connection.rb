module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.params[:token]
      return reject_unauthorized_connection unless token

      begin
        current_auth = Jwt.decode(token)
        User.find_by(id: current_auth['id']) || reject_unauthorized_connection
      rescue StandardError
        reject_unauthorized_connection
      end
    end
  end
end
