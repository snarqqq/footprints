class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable

  mount_uploader :avatar, ImageUploader

  has_many :posts
  has_many :viewports
  has_many :likes

  validates :name, presence: true, length: { maximum: 20 }
  validates :email, presence: true

  def self.find_for_oauth(auth)
    user = User.where(uid: auth.uid, provider: auth.provider).first

    user ||= User.create(
      uid: auth.uid,
      provider: auth.provider,
      email: auth.info.email? ? auth.info.email : User.dummy_email(auth),
      password: Devise.friendly_token[0, 20],
      name: auth.info.name,
      image: auth.info.image
    )

    user
  end

  private

    # ダミーのアドレスを用意
    def self.dummy_email(auth)
      "#{auth.uid}-#{auth.provider}@example.com"
    end
end
