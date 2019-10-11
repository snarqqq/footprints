class CreateViewports < ActiveRecord::Migration[5.2]
  def change
    create_table :viewports do |t|
      t.references :user,   null: false, default: false
      t.decimal        :sw_lat,    precision: 18, scale: 15,    null: false, default: false
      t.decimal        :sw_lng,    precision: 18, scale: 15,    null: false, default: false
      t.decimal        :ne_lat,    precision: 18, scale: 15,    null: false, default: false
      t.decimal        :ne_lng,    precision: 18, scale: 15,    null: false, default: false
      t.timestamps
    end
  end
end
