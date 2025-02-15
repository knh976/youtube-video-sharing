class AddUniquenessUsernameToUser < ActiveRecord::Migration[7.1]
  def up
    add_index :users, [:username], unique: true, name: 'idx_username_on_user'
  end

  def down
    remove_index :users, name: 'idx_username_on_user'
  end
end
