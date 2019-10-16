class Place < ApplicationRecord
  has_many :posts
  belongs_to :like
end
