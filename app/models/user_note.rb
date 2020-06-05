# == Schema Information
#
# Table name: user_notes
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  note_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserNote < ApplicationRecord
    belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :note,
    primary_key: :id,
    foreign_key: :note_id,
    class_name: :Note
end
