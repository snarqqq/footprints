class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  mount_uploader :avatar, ImageUploader

  has_many :posts
  has_many :viewports
  has_many :likes

  validates :name, presence: true, length: { maximum: 20}
  validates :email, presence: true

end
