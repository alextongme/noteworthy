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
require 'test_helper'

class UserNotebookTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
