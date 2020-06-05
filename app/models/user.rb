# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string
#  session_token   :string           not null
#  password_digest :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string
#  last_name       :string
#
class User < ApplicationRecord
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :password_digest, presence: true

    attr_reader :password

    # notebook associations
    has_many :user_notebooks,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :UserNotebook

    has_many :notebooks,
    dependent: :destroy,
    through: :user_notebooks, 
    source: :notebook

    # # Does it make sense to do this?
    # has_many :notebook_note_ids,
    # through: :notebooks,
    # source: :notebook_notes

    # note associations
    has_many :user_notes,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :UserNote

    has_many :notes,
    dependent: :destroy,
    through: :user_notes, 
    source: :note

    # tag associations
    has_many :user_tags,
    dependent: :destroy,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :UserTag

    has_many :tags,
    dependent: :destroy,
    through: :user_tags, 
    source: :tag
    
    after_initialize :ensure_session_token

    # capitalizes first and last name before CREATION
    def first_name=(s)
        super s.titleize
    end

    def last_name=(s)
        super s.titleize
    end
    # 

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)

        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end
    
    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end
    
    def reset_session_token!
        self.session_token = SecureRandom.base64(64)
        self.save!
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= SecureRandom.base64(64)
    end
end
