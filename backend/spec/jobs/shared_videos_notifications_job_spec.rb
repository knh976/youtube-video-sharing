# frozen_string_literal: true

require 'spec_helper'

RSpec.describe SharedVideosNotificationsJob, type: :job do
  let(:user) { create(:user, username: 'testuser') }
  let(:shared_video) { create(:shared_video, user: user, video_title: 'Test Video') }

  context 'when shared_video exists' do
    it 'broadcasts the shared video notification' do
      expect {
        described_class.new.perform(shared_video.id)
      }.to have_broadcasted_to("shared_videos").with(
        username: 'testuser',
        video_title: 'Test Video'
      )
    end
  end

  context 'when shared_video does not exist' do
    it 'does not broadcast any notification' do
      expect {
        described_class.new.perform(-1)
      }.not_to have_broadcasted_to("shared_videos")
    end
  end
end
