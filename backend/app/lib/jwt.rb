class Jwt
  ALGORITHM = 'HS256'

  def self.issue(payload)
    JWT.encode(
      payload,
      auth_secret,
      ALGORITHM
    )
  end

  def self.decode(token)
    JWT.decode(
      token,
      auth_secret,
      true,
      { algorithm: ALGORITHM }
    ).first
  rescue JWT::VerificationError
    nil
  end

  def self.auth_secret
    ENV["AUTH_SECRET"]
  end
end
