# == Schema Information
#
# Table name: user_tags
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserTag < ApplicationRecord
    belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :tag,
    primary_key: :id,
    foreign_key: :tag_id,
    class_name: :Tag
end
