class AllowNoteTitleAndBodyNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null :notes, :title, true
    change_column_null :notes, :body, true
  end
end
