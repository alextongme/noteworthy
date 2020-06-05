class Api::SessionsController < ApplicationController
    def create
        # debugger
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )
        # debugger
        if @user
            log_in!(@user)
            render "api/users/show"
        else
            render json: ["Invalid user/password"], status: 401
        end
    end

    # for finding if user exists
    def lookForUser
        # debugger
        @user = User.find_by(
            email: params[:email]
        )
        # debugger
        if @user
            render json: ["Email found"], status: 200
        else
            render json: ["Email not found, please signup!"], status: 401
        end
    end


    def destroy
        if current_user
            log_out!
            render json: ["Bye now!"]
        else
            render json: ["There is no user currently signed in."], status: 404
        end
    end
 end
 