# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    validates :username, :email, :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :password_digest, :first_name, :last_name, presence: true

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

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)

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
