class CreateSharedVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :shared_videos do |t|
      t.string :video_id
      t.string :video_url
      t.string :video_title
      t.string :video_description
      t.string :user_share_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
