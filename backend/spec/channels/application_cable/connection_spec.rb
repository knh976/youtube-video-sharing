# frozen_string_literal: true

require 'spec_helper'

RSpec.describe ApplicationCable::Connection, type: :channel do
  let(:user) { create(:user) }
  let(:token) { Jwt.issue({username: user.username, id: user.id}) }

  it 'successfully connects with valid token and valid user' do
    connect "/cable?token=#{token}"
    expect(connection.current_user).to eq(user)
  end

  it 'rejects connection with invalid token' do
    expect {
      connect "/cable?token=invalid_token"
    }.to have_rejected_connection
  end

  it 'rejects connection with empty token' do
    expect {
      connect "/cable"
    }.to have_rejected_connection
  end

  it 'rejects connection with invalid user' do
    user.destroy
    expect {
      connect "/cable?token=#{token}"
    }.to have_rejected_connection
  end
end
