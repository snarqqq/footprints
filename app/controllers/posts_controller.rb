class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update destroy]

  # GET /posts
  # GET /posts.json
  # 一つのリクエストに対して複数のフォーマットで返せない？(htmlとjson)
  def index
    @post = Post.new
    @posts = Post.where("user_id != ? and already_visited = ?", current_user.id, 1).order(created_at: :desc).limit(21).includes(:place, :images)
    @my_recent_posts = current_user.posts.where(already_visited: 1).order(created_at: :desc).includes(:place, :images, :user)
    @my_all_posts = current_user.posts.where(already_visited: 1).order(visit_date: :desc).includes(:place, :images, :user)
    @wannagos = current_user.posts.where(already_visited: 0).order(created_at: :desc).includes(:place, :images, :user)
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:id])
    render "show.js.erb"
  end

  # GET /posts/new
  def new
    @post = Post.new
    if params[:already_visited] == "false"
      render "new_wannago.js.erb"
    else
      render "new.js.erb"
    end
  end

  # GET /posts/1/edit
  def edit
    render "edit.js.erb"
  end

  # POST /posts
  # POST /posts.json
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

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
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
    # respond_to do |format|
    #   if @post.update(post_params)
    #     # format.html { redirect_to @post, notice: 'Post was successfully updated.' }
    #     # format.json { render :show, status: :ok, location: @post }
    #     format.js { render 'update.js.erb' }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @post.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @other_posts_judge = Post.where(place_id: @post.place_id).length
    @post.destroy if @post.user_id == current_user.id
    render "destroy.js.erb"
    # respond_to do |format|
    #   format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
    #   format.json { head :no_content }
    # end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
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
