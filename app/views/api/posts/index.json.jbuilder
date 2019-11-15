json.array! @my_recent_posts do |post|
  json.user_id post.user.id
  json.user_name post.user.name
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

json.array! @posts do |post|
  json.user_id post.user.id
  json.user_name post.user.name
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