json.place_name @post.place_name
json.titile @post.title
json.visit_date @post.visit_date.strftime("%Y/%m/%d")
json.body @post.body
json.place_id @place.place_id
json.lat @place.lat
json.lng @place.lng
json.images @post.images