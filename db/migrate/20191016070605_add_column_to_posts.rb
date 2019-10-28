class AddColumnToPosts < ActiveRecord::Migration[5.2]
  def change
    remove_columns :posts, :image, :map_id
    add_column :posts, :place_name, :string
    add_column :posts, :title, :string
    add_column :posts, :visit_date, :date
    add_reference :posts, :place, null: false
  end
end
