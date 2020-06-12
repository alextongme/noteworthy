Rails.application.routes.draw do
  # root page goes to our static page root route
  root "static_pages#root"

  # api routes for database manipulation
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    get 'session/lookForUser', to: 'sessions#lookForUser'

    resource :user, only: [:create, :update]

    resources :notebooks, only: [:index, :show, :create, :destroy, :update]

    resources :notes, only: [:index, :show, :create, :destroy, :update]
    
    resources :tags, only: [:index, :show, :create, :destroy, :update]
    
  end

end