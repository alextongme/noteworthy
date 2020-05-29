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
    # user associations
    has_many :user_notebooks,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :UserNotebook

    has_many :users, 
    through: :user_notebooks, 
    source: :user

    # tag associations
    has_many :notebook_tags,
    primary_key: :id,
    foreign_key: :notebook_tags,
    class_name: :NotebookTag

    has_many :tags,
    through: :notebook_tags,
    source: :tag

    # note associations
    has_many :notebook_notes,
    primary_key: :id,
    foreign_key: :notebook_id,
    class_name: :NotebookNote

    has_many :notes,
    through: :notebook_notes,
    source: :note
end
