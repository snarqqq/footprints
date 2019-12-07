class Viewport < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true
  validates :sw_lat, presence: true
  validates :sw_lng, presence: true
  validates :ne_lat, presence: true
  validates :ne_lng, presence: true

end
