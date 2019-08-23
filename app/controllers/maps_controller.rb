class MapsController < ApplicationController
  def index
  end

  def map
    @place = params[:address]
    results = Geocoder.search(@place)
    @latlng = results.first.coordinates
    map = Map.new(place: @place, lat: @latlng[0], lon: @latlng[1])
    map.save

    respond_to do |format|
      format.js
    end
  end

  private
  
    def map_params
      params.require(:post).permit(:body, :image).merge(user_id: current_user.id)
    end

end
