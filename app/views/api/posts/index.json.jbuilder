json.array! @posts do |post|
  json.post_id post.id
  json.place_name post.place_name
  json.title post.title
  json.visit_date post.visit_date&.strftime("%Y/%m/%d")
  json.body post.body
  json.images post.images
  json.place_id post.place.place_id
  json.lat post.place.lat
  json.lng post.place.lng
end



# json.array! @posts, partial: "posts/post", as: :post