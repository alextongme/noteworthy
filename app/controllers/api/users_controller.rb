class Api::UsersController < ApplicationController
    # path to create a new user
    def create
      @user = User.new(user_params)

      if @user.save # successful creation
        # debugger
        initialize_user(@user)
        log_in!(@user)
        render "api/users/show"
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def update
      # debugger
      if current_user.update(default_nb_params)
        render json: ['Success!'], status: 200
      else
        render json: current_user.errors.full_messages, status: 422
      end
    end

    private
    def user_params
      params.require(:user).permit(:password, :email)
    end

    def default_nb_params
      params.permit(:default_notebook_id)
    end

    def initialize_user(user)
      # debugger
      @notebook = Notebook.new({name: "Your first notebook!"})
      @note = Note.new({title: "Your first note!", body: "<p><span class='ql-font-monospace ql-size-huge'>Your first message!</span></p>"})
      # debugger
      if (@notebook.save && @note.save)
          user.default_notebook_id = @notebook.id
          create_user_notebook_association(user.id, @notebook.id)
          create_user_note_association(user.id, @note.id)
          create_notebook_note_association(@notebook.id, @note.id)
          # debugger
      else
          render json: [@notebook.errors.full_messages, @note.errors.full_messages], status: 422
      end
    end

    def create_user_notebook_association(user_id, ntbk_id)
      association = UserNotebook.new({
          user_id: user_id,
          notebook_id: ntbk_id
      })
      association.save
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
  