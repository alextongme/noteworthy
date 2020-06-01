class ChangeNotesDataType < ActiveRecord::Migration[5.2]
  def change
    change_column :notes, :body, :text
  end
end
