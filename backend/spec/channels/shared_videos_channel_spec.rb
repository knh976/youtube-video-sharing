# frozen_string_literal: true

require 'spec_helper'

RSpec.describe SharedVideosChannel, type: :channel do
  let(:user) { create(:user) }
  let(:token) { Jwt.issue({username: user.username, id: user.id}) }

  before do
    stub_connection current_user: user
  end

  it 'successfully subscribes' do
    subscribe(token: token)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("shared_videos")
  end

  it 'unsubscribes successfully' do
    subscribe(token: token)
    expect(subscription).to be_confirmed
    subscription.unsubscribe_from_channel
    expect(subscription).not_to have_streams
  end
end
