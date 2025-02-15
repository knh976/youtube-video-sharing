# frozen_string_literal: true

require 'spec_helper'

describe Youtube::Videos do
  describe '.get_by_id' do
    it 'returns video', vcr: { cassette_name: 'youtube/get_video_by_id' } do
      expect(described_class.get_by_id('wJnBTPUQS5A')).to be_a(described_class)
    end
  end
end
