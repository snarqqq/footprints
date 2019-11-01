Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'posts#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :posts
  resources :users, only: [:edit, :update]
  resources :maps, only: [:index, :map]
  # get '/map_request', to: 'posts#map', as: 'map_request'
  post '/map_request', to: 'maps#map', as: 'map_request'
  post '/save_viewport', to: 'maps#save_viewport', as: 'save_viewport'
  get '/set_viewport', to: 'maps#set_viewport', as: 'set_viewport'
end