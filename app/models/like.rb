class Like < ApplicationRecord
  belongs_to :user
  belongs_to :place
  belongs_to :post
  validates :place_id, presence: true, unless: :post_id?
end
