module Auth
  class Login < BaseService
    attr_reader :current_user, :jwt

    def initialize(username:, password:)
      @username = username
      @password = password
    end

    def call
      validate!
      return self unless success?

      create_user if @current_user.nil?
      gen_jwt

      self
    end

    private

    def validate!
      @current_user = User.find_by(username: @username)
      add_error 'Invalid password' if @current_user && !@current_user.authenticate(@password)
    end

    def create_user
      @current_user = User.create(username: @username, password: @password)
    end

    def gen_jwt
      @jwt = Jwt.issue({username: @current_user.username, id: @current_user.id})
    end
  end
end
