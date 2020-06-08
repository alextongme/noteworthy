class Api::NotesController < ApplicationController
    before_action :ensure_logged_in!

    def index
        @notes = current_user.notes
    end

    def show
        @note = Note.find(params[:id])
    end

    def create
        @note = Note.new(note_params)

        if @note.save
            create_user_note_association(current_user.id, @note.id)
            create_notebook_note_association(current_user.default_notebook_id, @note.id)
        else
            render json: @notebook.errors.full_messages, status: 422
        end
        render :show
    end

    def update
        @note = Note.find(params[:id])

        if @note.update(note_params)
            render :show
        else
            render json: @note.errors.full_messages, status: 422
        end
    end
 
    private

    def note_params
        params.require(:note).permit(:title, :body)
    end

    def create_user_note_association(user_id, nt_id)
        association = UserNote.new({
            user_id: user_id,
            note_id: nt_id
        })
        association.save
    end

    def create_notebook_note_association(ntbk_id, nt_id)
        association = NotebookNote.new({
            notebook_id: ntbk_id,
            note_id: nt_id
        })
        association.save
    end

end
