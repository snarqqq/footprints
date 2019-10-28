json.array! @posts do |post|
  json.place_name post.place_name
  json.place_id post.place.place_id
  json.lat post.place.lat
  json.lng post.place.lng
end



# json.array! @posts, partial: "posts/post", as: :post