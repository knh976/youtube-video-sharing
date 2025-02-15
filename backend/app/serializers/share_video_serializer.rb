# frozen_string_literal: true

class ShareVideoSerializer < ActiveModel::Serializer
  attributes :id, :video_url, :video_title, :video_description, :username

  def username
    object.user.username
  end
end
