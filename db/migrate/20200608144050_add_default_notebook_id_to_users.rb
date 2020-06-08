class AddDefaultNotebookIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :default_notebook_id, :integer, null: true
  end
end
