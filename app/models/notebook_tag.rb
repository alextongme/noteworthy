# == Schema Information
#
# Table name: notebook_tags
#
#  id          :bigint           not null, primary key
#  tag_id      :integer
#  notebook_id :integer
#  shortcut    :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class NotebookTag < ApplicationRecord
    belongs_to :notebook,
    primary_key: :id,
    foreign_key: :notebook_id,
    class_name: :Notebook

    belongs_to :tag,
    primary_key: :id,
    foreign_key: :tag_id,
    class_name: :Tag
end
