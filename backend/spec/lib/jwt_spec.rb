# frozen_string_literal: true

require 'spec_helper'

describe Jwt do
  let(:auth_secret) { '\x85\x11\xFA\xEF' }

  before do
    allow(ENV).to receive(:[])
    allow(ENV).to receive(:[]).with('AUTH_SECRET').and_return(auth_secret)
  end

  describe '::issue' do
    let(:payload) { { :username => 'aa' } }
    let(:jwt) { 'jwt_token' }

    it 'invoke params and return correctly' do
      expect(JWT)
        .to receive(:encode)
        .with(
          payload,
          auth_secret,
          described_class::ALGORITHM
        )
        .and_return(jwt)

      expect(
        described_class.issue(payload)
      ).to eq jwt
    end
  end

  describe '::decode' do
    let(:payload) { { :username => 'aa' } }
    let(:jwt) { 'jwt_token' }

    it 'invoke params and return correctly' do
      expect(JWT)
        .to receive(:decode)
        .with(
          'jwt_token',
          auth_secret,
          true,
          { algorithm: described_class::ALGORITHM }
        )
        .and_return([payload])

      expect(
        described_class.decode(jwt)
      ).to eq payload
    end
  end
end
