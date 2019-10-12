# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# Footprints DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|

usernameカラムにindexを貼る
```
add_index :users,  :name
```

### Association
- has_many :posts
- has_many :comments


## postsテーブル

|Column|Type|Options|
|------|----|-------|
|place_name|string|null: false|
|title|string||
|visit_date|date||
|body|text||
|place_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|
<!-- |image|string|| -->
<!-- |map_id|references|null: false, foreign_key: true| -->

Postモデル内でbodyカラムかimageカラムのどちらかがnullでなければ良いバリデーション
```
  validates :body_or_image, presence: true

  private
    def body_or_image
      body.presence or image.presence
    end
```

### Association
- belongs_to :user
- has_many :comments
- belongs_to :map

## imagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|post_id|references|null: false, foreign_key: true|

### Association
- belongs_to :post

## placesテーブル

|Column|Type|Options|
|------|----|-------|
|place_id|string|null: false|
|lat|decimal|null: false|
|lng|decimal|null: false|

### Association
- has_many :posts

## viewportsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|sw_lat|decimal|null: false|
|sw_lng|decimal|null: false|
|ne_lat|decimal|null: false|
|ne_lng|decimal|null: false|

### Association
- belongs_to :user

## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|references|null: false, foreign_key: true|
|post_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :post