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
        # @notebook.author = current_user
        if @notebook.save
            create_user_notebook_association(current_user.id, @notebook.id)
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

    def create_user_notebook_association(user_id, ntbk_id)
        association = UserNotebook.new({
            user_id: user_id,
            notebook_id: ntbk_id
        })
        association.save
    end
    
end
