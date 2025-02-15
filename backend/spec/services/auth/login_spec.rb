# frozen_string_literal: true

require 'spec_helper'

describe Auth::Login do
  subject { described_class.new(username: username, password: password) }

  describe '#call' do
    let!(:user) { create(:user, username: 'abc', password: 'correct_password') }
    let(:jwt_token) { 'jwt_token' }

    before do
      allow(Jwt).to receive(:issue).and_return(jwt_token)
    end

    context 'username exists and invalid password' do
      let(:username) { 'abc' }
      let(:password) { 'incorrect_password' }

      it 'returns error' do
        expect { subject.call }.not_to change { User.count }

        expect(subject.error?).to be_truthy
        expect(subject.errors.first.message).to eq 'Invalid password'
      end
    end

    context 'username exists and valid password' do
      let(:username) { 'abc' }
      let(:password) { 'correct_password' }

      it 'returns error' do
        expect { subject.call }.not_to change { User.count }

        expect(subject.success?).to be_truthy
        expect(subject.current_user.username).to eq 'abc'
        expect(subject.jwt).to eq jwt_token
      end
    end

    context 'username does exists' do
      let(:username) { 'xyz' }
      let(:password) { 'correct_password' }

      it 'returns user and jwt' do
        expect { subject.call }.to change { User.count }.from(1).to(2)

        expect(subject.success?).to be_truthy
        expect(subject.current_user.username).to eq 'xyz'
        expect(subject.jwt).to eq jwt_token
      end
    end
  end
end
