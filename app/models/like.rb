class Like < ApplicationRecord
  belongs_to :user
  has_many :places
  has_many :posts
  validates :place_id, presence: true, unless: :post_id?
end
