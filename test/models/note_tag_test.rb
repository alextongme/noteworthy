# == Schema Information
#
# Table name: note_tags
#
#  id         :bigint           not null, primary key
#  tag_id     :integer          not null
#  note_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class NoteTagTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
