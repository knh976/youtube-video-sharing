# frozen_string_literal: true

require 'spec_helper'

RSpec.describe SessionsController, type: :controller do
  describe 'POST /login', type: :request do
    let(:params) do
      {
        username: 'abc',
        password: 'xyz'
      }
    end

    before do
      expect(Auth::Login).to receive(:new).with(params).and_return(service_stub)
    end

    context 'login service runs success' do
      let(:path) { '/login' }
      let(:service_stub) do
        double(
          call: nil,
          success?: true,
          current_user: User.new(username: 'abc'),
          jwt: 'jwt_token'
        )
      end
      let(:response_body) { JSON.parse(response.body).with_indifferent_access }

      it 'responses 200' do
        post path, params: params

        expect(response).to have_http_status(:ok)
        expect(response_body[:username]).to eq 'abc'
        expect(response_body[:jwt]).to eq 'jwt_token'
      end
    end

    context 'login service returns error' do
      let(:path) { '/login' }
      let(:service_stub) do
        double(
          call: nil,
          success?: false,
          errors: [double(message: 'Failed')]
        )
      end
      let(:response_body) { JSON.parse(response.body).with_indifferent_access }

      it 'responses 404' do
        post path, params: params

        expect(response).to have_http_status(:forbidden)
        expect(response_body[:error_message]).to eq 'Failed'
      end
    end
  end
end
