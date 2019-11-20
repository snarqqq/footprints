class AddAlreadyVisitedToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :already_visited, :boolean, default: true, null: false
  end
end
