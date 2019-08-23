class Post < ApplicationRecord
  belongs_to :user
  belongs_to :map
  mount_uploader :image, ImageUploader
  validates :body, presence: true, unless: :image?
end
