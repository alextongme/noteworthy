class CreateNotebookTags < ActiveRecord::Migration[5.2]
  def change
    create_table :notebook_tags do |t|
      t.integer :tag_id
      t.integer :notebook_id
      t.boolean :shortcut
      
      t.timestamps
    end
  end
end
