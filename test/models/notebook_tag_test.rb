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
require 'test_helper'

class NotebookTagTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
