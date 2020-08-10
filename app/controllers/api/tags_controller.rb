class Api::TagsController < ApplicationController
    before_action :ensure_logged_in!

    def index
        @tags = current_user.tags
    end

    def show
        @tag = Tag.find(params[:id])
    end

    def create
        if Tag.find_by({name: params[:tag][:name]})
            @tag = Tag.find_by({name: params[:tag][:name]})
            create_tag_note_association(@tag.id, params[:tag][:note_id])
            render :show
        else
            @tag = Tag.new(tag_params)
            @tag.author_id = current_user.id

            if @tag.save
                create_tag_note_association(@tag.id, params[:tag][:note_id])
                render :show
            else
                render json: @tag.errors.full_messages, status: 422
            end
        end

        
    end

    # def update
    #     @tag = Tag.find(params[:id])

    #     # if tag has another note id to add
    #     if @tag.update(tag_params)
    #         if params[:tag][:note_id]
    #             create_note_tag_association(@tag.id, params[:tag][:note_id])
    #         elsif @tag.note_ids.length === 0
    #             destroy()
    #             return
    #         end
    #         render :show
    #     else
    #         render json: @tag.errors.full_messages, status: 422
    #     end
    # end

    def destroy
        @tag = Tag.find(params[:id])
        if params[:tag]
            delete_tag_note_association(params[:tag][:id], params[:tag][:note_id])
            render :show
        else
            if @tag.destroy
                render json: ["Tag deleted"], status: 200
            else
                render json: @tag.errors.full_messages, status: 422
            end
        end
        
    end

    private

    def tag_params
        params.require(:tag).permit(:name)
    end

    def create_tag_note_association(tag_id, nt_id)
        association = NoteTag.new({
            tag_id: tag_id,
            note_id: nt_id
        })
        association.save
    end

    def delete_tag_note_association(tag_id, nt_id)
        @association = NoteTag.find_by({
            tag_id: tag_id,
            note_id: nt_id
        })

        @association.destroy
    end

end
