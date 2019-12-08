class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update destroy]

  def index
    @post = Post.new
    @posts = Post.where("user_id != ? and already_visited = ?", current_user.id, 1).order(created_at: :desc).limit(21).includes(:place, :images)
    @my_recent_posts = current_user.posts.where(already_visited: 1).order(created_at: :desc).includes(:place, :images, :user)
    @my_all_posts = current_user.posts.where(already_visited: 1).order(visit_date: :desc).includes(:place, :images, :user)
    @wannagos = current_user.posts.where(already_visited: 0).order(created_at: :desc).includes(:place, :images, :user)
  end

  def show
    @post = Post.find(params[:id])
    render "show.js.erb"
  end

  def new
    @post = Post.new
    if params[:already_visited] == "false"
      render "new_wannago.js.erb"
    else
      render "new.js.erb"
    end
  end

  def edit
    render "edit.js.erb"
  end

  def create
    @place = Place.find_or_initialize_by(place_id: place_params[:place_id])
    @place.lat = place_params[:lat]
    @place.lng = place_params[:lng]
    @place.save!
    @post = @place.posts.new(post_params)
    @post.save!

    if params[:images]
      # image_params[:image].each do |image|
      #   @post.images.create(image: image, post_id: @post.id)
      # end
      image_params[:image].each do |_num, image|
        @post.images.create(image: image, post_id: @post.id)
      end

    end

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: "Post was successfully created." }
        format.json
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @post.update!(post_params)

    if image_remove_params != ""
      imageRemoveIds = image_remove_params.split(",").map(&:to_i)
      remove_images = Image.where(id: params[:imageRemoveIds])
      remove_images.each(&:destroy)
    end

    if params[:images]
      image_params[:image].each do |_num, image|
        @post.images.create(image: image, post_id: @post.id)
      end
    end
    render "update.js.erb"
  end

  def destroy
    @other_posts_judge = Post.where(place_id: @post.place_id).length
    @post.destroy if @post.user_id == current_user.id
    render "destroy.js.erb"
  end

  private

    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      place_name = params.require(:place_name)
      params.require(:post).permit(:title, :visit_date, :body, :already_visited).merge(user_id: current_user.id, place_name: place_name)
      # params.permit(:title, :visit_date, :body).merge(user_id: current_user.id, place_name: place_name)
    end

    def place_params
      params.permit(:place_id, :lat, :lng)
    end

    def image_params
      # params.require(:images)
      params.require(:images).permit({ image: {} })
    end

    def image_remove_params
      params.permit(:imageRemoveIds)[:imageRemoveIds]
    end
end
