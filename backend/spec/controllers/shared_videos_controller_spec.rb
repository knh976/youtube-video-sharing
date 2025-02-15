# frozen_string_literal: true

require 'spec_helper'

RSpec.describe SharedVideosController, type: :controller do
  describe 'POST /shared_videos', type: :request do
    let(:path) { '/shared_videos' }
    let(:url) { 'https://youtu.be/wJnBTPUQS5A' }
    let(:params) do
      {
        url: 'https://youtu.be/wJnBTPUQS5A',
      }
    end

    context 'not authorized' do
      let(:headers) { {} }

      it 'responses 401' do
        post path, headers: headers, params: params.to_json

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'authorized' do
      let(:headers) do
        {
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFhIiwiaWQiOjN9.KGST-Q4ImxMCU1ckyoN3CQqur60pr5Auj0As1KY_7zs'
        }
      end

      before do
        expect(SharedYoutubeVideo::Create)
          .to receive(:new)
          .and_return(
            double(
              call: nil,
              success?: true,
              data: double
            )
          )
      end

      it 'responses 200' do
        post path, headers: headers, params: params.to_json

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET /shared_videos', type: :request do
    let(:path) { '/shared_videos' }
    let(:response_body) { JSON.parse(response.body) }

    before do
      expect(SharedYoutubeVideo::GetList)
        .to receive(:new)
        .and_return(
          double(
            call: nil,
            success?: true,
            data: []
          )
        )
    end

    it 'responses 200' do
      get path

      expect(response).to have_http_status(:ok)
      expect(response_body).to eq []
    end
  end

end
