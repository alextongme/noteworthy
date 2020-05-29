class Api::NotebooksController < ApplicationController
    before_action :ensure_logged_in!

    def index
        @notebooks = current_user.notebooks
        render :index
    end

    def create
        @notebook = Notebook.new(notebook_params)
        @notebook.user_id = params[:user_id]

        if @notebook.save
        else
            flash[:errors] = @goal.errors.full_messages
        end

        redirect_to user_url(@notebook.user)
    end

    def destroy
        @notebook = current_user.notebooks.find_by(id: params[:id])
        if @notebook && @notebook.delete 
            redirect_to users_url
        end
    end
 
    private

    def notebook_params
        params.require(:notebook).permit(:name)
    end
    
end
