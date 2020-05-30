class CreateUserNotebooks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_notebooks do |t|
      t.integer :user_id, null: false
      t.integer :notebook_id, null: false
      t.boolean :shortcut, null: false

      t.timestamps
    end
  end
end
