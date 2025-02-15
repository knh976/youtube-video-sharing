# frozen_string_literal: true

require 'spec_helper'

describe SharedYoutubeVideo::GetList do
  subject { described_class.new }

  describe '#call' do
    let!(:shared_video_1) { create(:shared_video) }
    let!(:shared_video_2) { create(:shared_video) }

    context 'valid user_share_url' do

      it 'returns correctly' do
        subject.call

        expect(subject.data.size).to eq 2
        expect(subject.data).to all(be_a(SharedVideo))
      end
    end
  end
end
