require 'rails_helper'
describe Post do
  describe '#create' do
    it "is invalid without a place_name" do
      post = build(:post, place_name: nil)
      post.valid?
      expect(post.errors[:place_name]).to include("can't be blank")
    end
  end
end