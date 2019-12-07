class Post < ApplicationRecord
  belongs_to :user
  belongs_to :place
  has_many :likes
  has_many :images, dependent: :destroy

  validates :user_id, presence: true
  validates :place_id, presence: true
  validates :place_name, presence: true
  validates :title, length: { maximum: 40 }
  validates :body, length: { maximum: 1000 }
end
