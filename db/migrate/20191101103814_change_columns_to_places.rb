class ChangeColumnsToPlaces < ActiveRecord::Migration[5.2]
  def up
    change_column :places, :lat, :decimal, precision: 18, scale: 15, null: false, default: false
    change_column :places, :lng, :decimal, precision: 18, scale: 15, null: false, default: false
  end

  def down
    change_column :places, :lat, :float, null: false
    change_column :places, :lng, :float, null: false
  end
end
