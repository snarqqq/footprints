class RemoveForeignKeyFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :posts, column: :map_id
  end
end
