class SharedVideosChannel < ApplicationCable::Channel
  BROADCASTING = "shared_videos"

  def subscribed
    stream_from BROADCASTING
  end
end
