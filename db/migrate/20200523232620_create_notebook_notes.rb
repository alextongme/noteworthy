class CreateNotebookNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notebook_notes do |t|
      t.integer :note_id, null: false
      t.integer :notebook_id, null: false

      t.timestamps
    end
  end
end
