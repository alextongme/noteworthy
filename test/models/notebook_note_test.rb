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
require 'test_helper'

class NotebookNoteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
