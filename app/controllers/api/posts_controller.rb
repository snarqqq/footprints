class Api::PostsController < ApplicationController
  def index
    @my_recent_posts = current_user.posts.order("created_at ASC").includes(:place, :images)
    @posts = Post.where("user_id != ?", current_user.id).limit(21).includes(:place, :images, :user)
  end
end