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
    has_many :user_tags,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :UserTag

    has_many :users, 
    through: :user_tags, 
    source: :user

    # notebook associations
    has_many :user_tags,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :UserTag

    has_many :users, 
    through: :user_tags, 
    source: :user
end
