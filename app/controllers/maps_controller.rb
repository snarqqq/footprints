class MapsController < ApplicationController
  def index; end

  def save_viewport
    @viewport = Viewport.find_or_initialize_by(user_id: current_user.id)
    @viewport.sw_lat = viewport_params[:sw_lat]
    @viewport.sw_lng = viewport_params[:sw_lng]
    @viewport.ne_lat = viewport_params[:ne_lat]
    @viewport.ne_lng = viewport_params[:ne_lng]
    @viewport.save!
  end

  def set_viewport
    @viewport = Viewport.find_by(id: current_user.id)
  end

  # def map
  #   @place = params[:address]
  #   results = Geocoder.search(@place)
  #   @latlng = results.first.coordinates
  #   map = Map.new(place: @place, lat: @latlng[0], lon: @latlng[1])
  #   map.save

  #   respond_to do |format|
  #     format.js
  #   end
  # end

  private

    def viewport_params
      params.permit(:sw_lat, :sw_lng, :ne_lat, :ne_lng)
    end

    def map_params
      params.require(:post).permit(:body, :image).merge(user_id: current_user.id)
    end
end
