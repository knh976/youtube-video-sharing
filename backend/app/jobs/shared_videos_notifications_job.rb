# frozen_string_literal: true

class SharedVideosNotificationsJob
  include Sidekiq::Job
  sidekiq_options queue: :notifications

  def perform(shared_video_id)
    shared_video = SharedVideo.joins(:user).select('shared_videos.video_title, users.username').find_by(id: shared_video_id)
    return if shared_video.nil?

    ActionCable.server.broadcast(
      SharedVideosChannel::BROADCASTING,
      {
        username: shared_video.username,
        video_title: shared_video.video_title
      }
    )
  end
end
