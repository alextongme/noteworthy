class RemoveShortcutColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :notebook_tags, :shortcut
  end
end
