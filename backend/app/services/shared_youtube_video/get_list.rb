module SharedYoutubeVideo
  class GetList < BaseService
    attr_reader :data

    def call
      @data = get_shared_videos

      self
    end

    private

    def get_shared_videos
      SharedVideo.includes(:user).order(created_at: :DESC)
    end
  end
end
