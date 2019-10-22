class Post < ApplicationRecord
  belongs_to :user
  belongs_to :place
  has_many :likes
  has_many :images, dependent: :destroy
  # accepts_nested_attributes_for :images

  validates :title, length: { maximum: 40 }
  # validates :body, presence: true
end
