class Api::PostsController < ApplicationController
  def index
    @posts = current_user.posts.order("created_at ASC").includes(:place, :images)
  end
end