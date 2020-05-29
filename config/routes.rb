Rails.application.routes.draw do
  # root page goes to our static page root route
  root "static_pages#root"

  # api routes for database manipulation
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resource :user, only: [:create]
    resources :notebooks, only: [:destroy]
    resources :notes, only: [:create, :show, :update, :destroy]
    resources :tags, only: [:create, :show, :update, :destroy]
  end

end