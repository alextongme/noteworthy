class CreateUserTags < ActiveRecord::Migration[5.2]
  def change
    create_table :user_tags do |t|
      t.integer :user_id, null: false
      t.integer :tag_id, null: false

      t.timestamps
    end
  end
end
