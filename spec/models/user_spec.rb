require "rails_helper"
describe User do
  describe "#create" do
    it "is valid with a name, email, password, password_confirmation" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid without a name" do
      user = build(:user, name: nil)
      user.valid?
      expect(user.errors[:name]).to include("can't be blank")
    end

    it "is invalid without a email" do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "is invalid without a password" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it "is invalid without a password_confirmation although with a password" do
      user = build(:user, password_confirmation: "")
      user.valid?
      expect(user.errors[:password_confirmation]).to include("doesn't match Password")
    end

    it "is invalid with a duplicate email address" do
      user = create(:user)
      another_user = build(:user, email: user.email)
      another_user.valid?
      expect(another_user.errors[:email]).to include("has already been taken")
    end

    it "is invalid with a name that has 21 and more characters " do
      user = build(:user, name: "abcdeabcdeabcdeabcdea")
      user.valid?
      expect(user.errors[:name][0]).to include("is too long")
    end

    it "is valid with a name that has 20 or less characters " do
      user = build(:user, name: "abcdeabcdeabcdeabcde")
      expect(user).to be_valid
    end

    it "is valid with a password that has 6 and more characters" do
      user = build(:user, password: "000000", password_confirmation: "000000")
      expect(user).to be_valid
    end

    it "is invalid with a password that has 5 or less characters " do
      user = build(:user, password: "00000", password_confirmation: "00000")
      user.valid?
      expect(user.errors[:password][0]).to include("is too short")
    end

    context "sign up using facebook"

    # before do
    #   OmniAuth.config.mock_auth[:facebook] = nil
    #   Rails.application.env_config['omniauth.auth'] = facebook_mock
    #   visit root_path
    #   click_link "ログイン"
    # end

    # it "サインアップするとユーザーが増える" do
    #   expect{
    #     click_link "Facebookでログイン"
    #   }.to change(User, :count).by(1)
    # end

    # it "すでに連携されたユーザーがサインアップしようとするとユーザーは増えない" do
    #   click_link "Facebookでログイン"
    #   click_link "ログアウト"
    #   click_link "ログイン"
    #   expect{
    #     click_link "Facebookでログイン"
    #   }.not_to change(User, :count)
    # end
  end
end
