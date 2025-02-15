# frozen_string_literal: true

require 'spec_helper'

describe SharedYoutubeVideo::Create do
  subject { described_class.new(user_id, user_share_url) }

  describe '#call' do
    let!(:user) { create(:user, username: 'abc', password: 'password') }
    let(:user_id) { user.id }
    let(:title) { 'video_title' }
    let(:description) { 'video_description' }

    before do
      allow(Youtube::Videos).to receive(:get_by_id)
        .and_return(double(title: title, description: description))
    end

    context 'invalid user_share_url' do
      let(:user_share_url) { 'abcdyiz' }

      it 'returns error' do
        expect { subject.call }.not_to change { SharedVideo.count }

        expect(subject.error?).to be_truthy
        expect(subject.errors.first.message).to eq 'Invalid youtube url'
      end
    end

    context 'invalid youtube video' do
      let(:user_share_url) { 'https://www.youtube.com/watch?v=wJnBTPUQS5A' }

      before do
        allow(Youtube::Videos).to receive(:get_by_id).and_return(nil)
      end

      it 'returns error' do
        expect { subject.call }.not_to change { SharedVideo.count }

        expect(subject.error?).to be_truthy
        expect(subject.errors.first.message).to eq 'Invalid youtube video'
      end
    end

    context 'valid user_share_url' do
      let(:user_share_url) { 'https://www.youtube.com/watch?v=wJnBTPUQS5A' }

      it 'returns correct shared video' do
        expect { subject.call }.to change { SharedVideo.count }.from(0).to(1)
        shared_video = SharedVideo.first

        expect(subject.success?).to be_truthy
        expect(subject.data).to eq shared_video
        expect(shared_video.user_id).to eq user_id
        expect(shared_video.user_share_url).to eq user_share_url
        expect(shared_video.video_id).to eq 'wJnBTPUQS5A'
        expect(shared_video.video_url).to eq 'https://youtu.be/wJnBTPUQS5A'
        expect(shared_video.video_title).to eq title
        expect(shared_video.video_description).to eq description
      end
    end
  end
end
