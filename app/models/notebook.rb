# == Schema Information
#
# Table name: notebooks
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Notebook < ApplicationRecord
    before_destroy :delete_notes

    # note associations
    has_many :notebook_notes,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :notebook_id,
    class_name: :NotebookNote

    has_many :notes,
    through: :notebook_notes,
    source: :note

    # user associations
    has_many :user_notebooks,
    primary_key: :id,
    foreign_key: :notebook_id,
    class_name: :UserNotebook

    has_many :users, 
    through: :user_notebooks, 
    source: :user

    

    private
    def delete_notes
        notes.each do |note|
            note.destroy
        end
    end
end
