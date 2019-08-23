class CreateMaps < ActiveRecord::Migration[5.2]
  def change
    create_table :maps do |t|
      t.string       :place,   null: false
      t.float        :lat,     null: false
      t.float        :lon,     null: false
      t.timestamps
    end
  end
end
