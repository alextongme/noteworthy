class Api::NotebooksController < ApplicationController
    before_action :ensure_logged_in!

    def index
        @notebooks = current_user.notebooks
        render :index
    end

    def create
        # debugger
        @notebook = Notebook.new(notebook_params)
        # @notebook.user_id = params[:user_id]
        # debugger
        if @notebook.save
            # UserNotebook.create({
            #     user_id: current_user.id,
            #     notebook_id: @notebook.id
            # })
        else
            render json: @notebook.errors.full_messages, status: 422
        end

        render :show
        # redirect_to user_url(@notebook.user)
    end

    def destroy
        # @notebook = current_user.notebooks.find_by(id: params[:id])
        # if @notebook && @notebook.delete 
        #     redirect_to users_url
        # end
    end
 
    private

    def notebook_params
        # debugger
        params.require(:notebook).permit(:name)
    end
    
end
