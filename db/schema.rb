# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_05_034245) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "note_tags", force: :cascade do |t|
    t.integer "tag_id", null: false
    t.integer "note_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["note_id", "tag_id"], name: "index_note_tags_on_note_id_and_tag_id", unique: true
  end

  create_table "notebook_notes", force: :cascade do |t|
    t.integer "note_id", null: false
    t.integer "notebook_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["notebook_id", "note_id"], name: "index_notebook_notes_on_notebook_id_and_note_id", unique: true
  end

  create_table "notebooks", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "title", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "author_id"
    t.index ["author_id", "name"], name: "index_tags_on_author_id_and_name", unique: true
  end

  create_table "user_notebooks", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "notebook_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "notebook_id"], name: "index_user_notebooks_on_user_id_and_notebook_id", unique: true
  end

  create_table "user_notes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "note_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "note_id"], name: "index_user_notes_on_user_id_and_note_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
