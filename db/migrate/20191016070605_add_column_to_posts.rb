class AddColumnToPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :image, :string
    add_column :posts, :place_name, :string
    add_column :posts, :title, :string
    add_column :posts, :visit_date, :date
    add_reference :posts, :place, null: false
  end
end
