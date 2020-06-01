Rails.application.routes.draw do
  # root page goes to our static page root route
  root "static_pages#root"

  # api routes for database manipulation
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]

    resource :user, only: [:create]
    resources :user_notebooks, only: [:index, :create, :destroy, :update]
    resources :user_notes, only: [:index, :create, :destroy, :update]

    resources :notebooks, only: [:index, :show, :create, :destroy, :update]
    resources :notebook_tags, only: [:index, :create, :destroy, :update]
    resources :notebook_notes, only: [:index, :create, :destroy, :update]

    resources :notes, only: [:create, :show, :update, :destroy]
    resources :note_tags, only: [:index, :create, :destroy, :update]
    
    resources :tags, only: [:create, :show, :update, :destroy]
  end

end