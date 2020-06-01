class AddDestroyDependencies < ActiveRecord::Migration[5.2]
  def change
    drop_table :user_tags
    drop_table :notebook_tags
    add_column :tags, :author_id, :integer

    add_index :user_notebooks, [:user_id, :notebook_id], unique: true
    add_index :user_notes, [:user_id, :note_id], unique: true
    add_index :tags, [:author_id, :name], unique: true
    add_index :notebook_notes, [:notebook_id, :note_id], unique: true
    add_index :note_tags, [:note_id, :tag_id], unique: true
  end
end
