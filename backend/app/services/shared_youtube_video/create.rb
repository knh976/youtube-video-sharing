module SharedYoutubeVideo
  class Create < BaseService
    attr_reader :data

    YOUTUBE_VIDEO_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

    def initialize(user_id, user_share_url)
      @user_id = user_id
      @user_share_url = user_share_url
    end

    def call
      validate!
      return self unless success?

      @data = create_shared_video

      self
    end

    private

    def validate!
      return add_error 'Invalid youtube url' if video_id.nil?

      add_error 'Invalid youtube video' if youtube_video.nil?
    end

    def video_id
      r = @user_share_url.match(YOUTUBE_VIDEO_ID_REGEX)
      return if r.nil?

      r[1]
    end

    def video_url
      "https://youtu.be/#{video_id}"
    end

    def youtube_video
      return @youtube_video if defined? @youtube_video

      @youtube_video = Youtube::Videos.get_by_id(video_id)
    end

    def video_title
      youtube_video.title
    end

    def video_description
      youtube_video.description
    end

    def create_shared_video
      SharedVideo.create(
        user_id: @user_id,
        user_share_url: @user_share_url,
        video_id: video_id,
        video_url: video_url,
        video_title: video_title,
        video_description: video_description
      )
    end
  end
end
