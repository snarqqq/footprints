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

  scope :other_users,  -> (current_user_id) { where("user_id != ?", current_user_id) }
  scope :already_visited,  -> { where(already_visited: 1) }
  scope :not_visited,  -> { where(already_visited: 0) }
  scope :recently_posted, -> { order(created_at: :desc) }
  scope :recently_visited, -> { order(visit_date: :desc) }
end
