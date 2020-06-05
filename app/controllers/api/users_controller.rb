class Api::UsersController < ApplicationController
    # path to create a new user
    def create
      @user = User.new(user_params)

      if @user.save # successful creation
        log_in!(@user)
        render "api/users/show"
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    private
    def user_params
      params.require(:user).permit(:password, :email)
    end
  end
  