class DropMaps < ActiveRecord::Migration[5.2]
  def up
    # drop_table :maps
  end

  def down
    create_table :posts do |t|
      t.text       :body
      t.string     :image
      t.references :user,   null: false, foreign_key: true
      t.timestamps
    end
  end
end