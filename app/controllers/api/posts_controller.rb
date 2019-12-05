class Api::PostsController < ApplicationController
  def index
    @my_recent_posts = current_user.posts.order(created_at: :asc).includes(:place, :images)
    @posts = Post.where("user_id != ? and already_visited = ?", current_user.id, 1).order(created_at: :desc).limit(21).includes(:place, :images, :user)
  end
end
