class ApplicationController < ActionController::Base
    # protect from CSRF attacks
    ### cb
    protect_from_forgery with: :exception

    # provide these methods to our front end views
    # check if this is still necessary for react implementation
    ### cb
    helper_method :current_user, :logged_in?

    private
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def ensure_logged_in!
        unless logged_in?
            render json: ["not logged in"], status: 401
        end
    end

    def logged_in?
        !!current_user
    end

    def log_in!(user)
        @current_user = user
        session[:session_token] = user.reset_session_token!
    end

    def log_out!
        current_user.reset_session_token!
        session[:session_token] = nil
    end
end
