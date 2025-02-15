module SharedYoutubeVideo
  class GetList < BaseService
    attr_reader :data

    def call
      @data = get_shared_videos

      self
    end

    private

    def get_shared_videos
      SharedVideo.all
    end
  end
end
