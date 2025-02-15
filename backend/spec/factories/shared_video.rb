# frozen_string_literal: true

FactoryBot.define do
  factory :shared_video do
    video_id { Faker::Alphanumeric.alpha }
    video_url { Faker::Alphanumeric.alpha }
    video_title { Faker::Alphanumeric.alpha }
    video_description { Faker::Alphanumeric.alpha }
    user_share_url { Faker::Alphanumeric.alpha }
    user
  end
end
