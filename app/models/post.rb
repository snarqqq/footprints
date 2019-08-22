class Post < ApplicationRecord
  belongs_to :user
  mount_uploader :image, ImageUploader
  validates :body, presence: true, unless: :image?
end
