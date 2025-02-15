# frozen_string_literal: true

require 'spec_helper'

describe User, type: :model do
  subject { build(:user) }

  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
  end
end
