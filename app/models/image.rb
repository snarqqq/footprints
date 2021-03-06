class Image < ApplicationRecord
  belongs_to :post
  mount_uploader :image, ImageUploader

  validates :image, presence: true
  validates :post_id, presence: true
end
