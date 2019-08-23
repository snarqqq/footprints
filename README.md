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
|username|string|null: false|

usernameカラムにindexを貼る
```
add_index :users,  :username
```

### Association
- has_many :posts
- has_many :comments


## postsテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|map_id|references|null: false, foreign_key: true|

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


## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|references|null: false, foreign_key: true|
|post_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :post

## mapsテーブル

|Column|Type|Options|
|------|----|-------|
|place|string|null: false|
|lat|float|null: false|
|lon|float|null: false|

### Association
- has_many :posts
