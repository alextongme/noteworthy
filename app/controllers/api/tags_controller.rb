class Api::TagsController < ApplicationController
    before_action :ensure_logged_in!

    def index
        @tags = current_user.tags
    end

    # def show
    #     @notebook = Notebook.find(params[:id])
    # end

    # def create
    #     @notebook = Notebook.new(notebook_params)

    #     if @notebook.save
    #         create_user_notebook_association(current_user.id, @notebook.id)
    #     else
    #         render json: @notebook.errors.full_messages, status: 422
    #     end
    #     render :show
    # end

    # def update
    #     @notebook = Notebook.find(params[:id])

    #     if @notebook.update(notebook_params)
    #         render :show
    #     else
    #         render json: @notebook.errors.full_messages, status: 422
    #     end
    # end

    # def destroy
    #     @notebook = Notebook.find(params[:id])
    #     if @notebook.destroy
    #         # debugger
    #         render :show
    #         # debugger
    #     else
    #         render json: @notebook.errors.full_messages, status: 422
    #     end
    # end
 
    # private

    # def notebook_params
    #     # debugger
    #     params.require(:notebook).permit(:name)
    # end

    # def create_user_notebook_association(user_id, ntbk_id)
    #     association = UserNotebook.new({
    #         user_id: user_id,
    #         notebook_id: ntbk_id
    #     })
    #     association.save
    # end
    
end
