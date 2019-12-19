# 本アプリケーションについて

###### URL： https://www.footprintsmap.com/

### ログイン方法

<テストユーザーでログイン>
Email: test@test.com
Password: 12345678
でテストユーザーとしてログインできます。
ご覧になった後はお手数ですが、必ずログアウトをお願い致します。
(ヘッダー右上のユーザーアイコン -> ログアウトをクリック)

### 概要

本アプリケーションのコンセプトは「訪れた場所、行ってみたい場所を記録し自分だけの地図を作るアプリ」です。
私はGoogle Mapsが好きで同様のことを同アプリで行ってきましたが、同アプリは機能や情報量が多すぎるので、それらを削ぎ落とし主にユーザー固有の情報を反映、表示することに特化したアプリを自分の手で開発しました。

## 機能一覧ならびに使用技術

- ### フロントエンド
  - Haml/Sassでのマークアップ
  - Bootstrapとメディアクエリを使用し、レスポンシブデザイン化
  - CSSアニメーションやBootstrapの機能を使用し、シンプルで豊かなUI
  - UXに配慮し、可能な限りAjaxを使用しSPAライクに

- ### サーバーサイド
  - 場所の検索機能 (Google Maps API を利用)
  - 訪れた場所・行ってみたい場所の投稿機能 (& 編集・削除)機能
  - Dropzone.js を利用し、複数画像のドラッグ&ドロップによるアップロード機能
  - ユーザー登録機能 (gem Devise を利用)
  - ユーザー画像の登録機能 (gem Carrierwave を利用)
  - Twitter および Facebook アカウントでのログイン機能 (gem OmniAuth を利用)
  - 単体テスト (RSpec)
- ### インフラ
  - Capistrano による EC2 インスタンスへの自動デプロイ
  - Route53 で独自ドメインを設定し、ELB を経由し常時 SSL 化
  - Amazon S3 に画像ファイルを保存

## 参考画像

- #### トップページ

<img width="600" alt="Footprints_rootpage" src="https://user-images.githubusercontent.com/53476262/70966375-65216900-20d6-11ea-8d96-6a34830f9c9e.png">

- #### ポスト詳細ページ

<img width="600" alt="Footprints_post" src="https://user-images.githubusercontent.com/53476262/70966484-c3e6e280-20d6-11ea-89a6-b70c8dc9a842.png">

- #### AWS インフラ構成

<img width="400" alt="Booklabo_AWS" src="https://user-images.githubusercontent.com/53476262/71153602-e155b100-227c-11ea-8727-3e5171f12adc.jpg">

- #### ER 図

<img width="600" alt="Booklabo_ERD" src="https://user-images.githubusercontent.com/53476262/71153756-4ad5bf80-227d-11ea-91a1-2c69a7048cfb.png">