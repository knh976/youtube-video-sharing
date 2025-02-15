class SharedVideo < ApplicationRecord
  validates_presence_of :user_id, :user_share_url

  belongs_to :user
end
