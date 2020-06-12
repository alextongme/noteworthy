# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#
class Tag < ApplicationRecord
    # user associations
    belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

    # note associations
    has_many :note_tags,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :tag_id,
    class_name: :NoteTag

    has_many :notes, 
    through: :note_tags, 
    source: :note
end
