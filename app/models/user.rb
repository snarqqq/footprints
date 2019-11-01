class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable

  mount_uploader :avatar, ImageUploader

  has_many :posts
  has_many :viewports
  has_many :likes

  validates :name, presence: true, length: { maximum: 20}
  validates :email, presence: true

  def self.find_for_oauth(auth)
    user = User.where(uid: auth.uid, provider: auth.provider).first

    unless user
      user = User.create(
        uid:      auth.uid,
        provider: auth.provider,
        email:    auth.info.email,
        password: Devise.friendly_token[0, 20],
        name:  auth.info.name,
        image:  auth.info.image
      )
    end

    user
  end

end
