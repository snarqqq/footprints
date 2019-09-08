class Post < ApplicationRecord
  belongs_to :user
  belongs_to :place
  validates :body, presence: true
end
