# == Schema Information
#
# Table name: notebook_notes
#
#  id          :bigint           not null, primary key
#  note_id     :integer          not null
#  notebook_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class NotebookNote < ApplicationRecord
    belongs_to :notebook,
    primary_key: :id,
    foreign_key: :notebook_id,
    class_name: :Notebook

    belongs_to :note,
    primary_key: :id,
    foreign_key: :note_id,
    class_name: :Note
end
