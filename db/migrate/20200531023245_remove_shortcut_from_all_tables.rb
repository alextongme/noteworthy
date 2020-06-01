class RemoveShortcutFromAllTables < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_notebooks, :shortcut
    remove_column :user_notes, :shortcut
  end
end
