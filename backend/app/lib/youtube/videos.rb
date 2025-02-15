# frozen_string_literal: true

module Youtube
  class Videos
    ENDPOINT = "https://www.googleapis.com/youtube/v3/videos"
    class << self
      def get_by_id(id)
        response = RestClient.get("#{ENDPOINT}?id=#{id}&part=snippet&part=statistics&key=#{ENV['GOOGLE_API_KEY']}")
        body = JSON.parse(response.body)
        return if body.nil? || body['items'].size.zero?

        new(body['items'][0])
      end
    end

    attr_reader :title, :description

    def initialize(video_item)
      @title = video_item.dig('snippet', 'title')
      @description = video_item.dig('snippet', 'description')
    end
  end
end
