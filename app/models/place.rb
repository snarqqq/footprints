class Place < ApplicationRecord
  has_many :posts
  has_many :likes

  validates :place_id, presence: true
  validates :lat, presence: true
  validates :lng, presence: true
end
