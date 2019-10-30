class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :posts
  has_many :viewports
  has_many :likes
  has_one_attached :avatar

  validates :name, presence: true, length: { maximum: 20}
  validates :email, presence: true

end
