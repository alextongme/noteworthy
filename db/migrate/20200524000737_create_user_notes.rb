class CreateUserNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_notes do |t|
      t.integer :user_id, null: false
      t.integer :note_id, null: false
      t.boolean :shortcut, null: false

      t.timestamps
    end
  end
end
