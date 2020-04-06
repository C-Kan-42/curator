class Subscription < ApplicationRecord
    validates :subscriber_id, :feed_id, presence: true
    validates :feed_id, uniqueness: {scope: :subscriber_id}

    after_initialize :ensure_default_title, on: :create

    def ensure_default_title
        self.title = feed.title if title.nil? || title.empty?
    end

    belongs_to :subscriber,
        class_name: :User,
        foreign_key: :subscriber_id

    belongs_to :feed,
        class_name: :Feed,
        foreign_key: :feed_id,
        primary_key: :id,
        counter_cache: :subscriptions_count

    has_many :articles,
        through: :feed,
        source: :articles

    #uncomment after adding collections
    # has_many :collections,
    #     through: :subscriber,
    #     source: :collections
    
end