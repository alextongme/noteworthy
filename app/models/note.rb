# == Schema Information
#
# Table name: notes
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Note < ApplicationRecord
    # user associations
    has_many :user_notes,
    primary_key: :id,
    foreign_key: :note_id,
    class_name: :UserNote

    has_many :users, 
    through: :user_notes, 
    source: :user

    # tag associations
    has_many :note_tags,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :NoteTag

    has_many :tags,
    through: :note_tags,
    source: :note

    # notebook associations
    has_many :notebook_notes,
    primary_key: :id,
    foreign_key: :note_id,
    class_name: :NotebookNote

    has_many :notebooks,
    through: :notebook_notes,
    source: :notebook
    
end
