class User < ApplicationRecord
    attr_accessor :give_seeds

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
    validates :session_token, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    # This allows us to run methods before running validations
    # In this case, we need to have a session_token when a user is first created
    after_initialize :ensure_session_token

    before_create :ensure_seed_default
    after_create_commit :seed_user, if: @give_seeds

    has_many :subscriptions,
        foreign_key: :subscriber_id,
        dependent: :destroy

    has_many :feeds,
        through: :subscriptions,
        source: :feed
    
    has_many :articles,
        through: :feeds,
        source: :articles
    
    #add collections and read article relations here

    # Class method for finding a user ONLY if we have the correct email and password
    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        # Set temporary instance variable so that we can validate length
        @password = password
        # Create a password_digest so that we do not have to store the plain-text password in our DB
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        # Use BCrypt's built-in method for checking if the password provided is the user's password
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def ensure_session_token
        # Generate the initial session_token so that we pass the validation
        # This method runs right after the model is initialized, before any validations are run
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    def reset_session_token!
        # When a user logs out, we want to scramble their session_token so that bad people cannot use the old one
        self.session_token = SecureRandom.urlsafe_base64
        self.save
        self.session_token
    end

    def ensure_seed_default
        @give_seeds ||= true
    end

    # after_create_commit if option not disabled
    def seed_user
        seed_urls = [
            'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
            'https://feeds.npr.org/1019/rss.xml',
            'https://www.wired.com/feed/rss'
        ]

        seed_urls.each do |url|
        feed = Feed.find_by(rss_url: url)
        next if feed.nil?
        s = Subscription.new(
            subscriber_id: id,
            feed_id: feed.id
        )
        s.save
        end
    end

    def subscription_by_feed(feed_id)
        subscriptions.find_by(feed_id: feed_id)
    end

    private

    # This makes it so we can validate our password length, without storing it in the DB
    attr_reader :password
end
