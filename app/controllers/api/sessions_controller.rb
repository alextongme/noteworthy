class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
        )

        if @user
            log_in!(@user)
            render "api/users/show"
        else
            render json: ["Invalid user/password"], status: 401
        end
    end

    def destroy
        if current_user
            log_out!
            render "api/users/show"
        else
            render json: ["There is no user currently signed in."], status: 404
        end
    end
 end
 