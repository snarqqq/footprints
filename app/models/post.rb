class Post < ApplicationRecord
  belongs_to :user
  belongs_to :place
  has_many :images, dependent: :destroy
  # accepts_nested_attributes_for :images
  validates :body, presence: true
end
