# == Schema Information
#
# Table name: user_notebooks
#
#  id          :bigint           not null, primary key
#  user_id     :integer          not null
#  notebook_id :integer          not null
#  shortcut    :boolean          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class UserNotebook < ApplicationRecord
    belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :notebook,
    primary_key: :id,
    foreign_key: :notebook_id,
    class_name: :Notebook
end
