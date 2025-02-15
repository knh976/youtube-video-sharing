# frozen_string_literal: true

require 'spec_helper'

describe SharedVideo, type: :model do
  subject { build(:shared_video) }

  describe 'validations' do
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:user_share_url) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end
end
