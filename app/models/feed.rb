require 'rss'
require 'open-uri'

class Feed < ApplicationRecord
    validates :rss_url, presence: true

    has_many :subscriptions,
        foreign_key: :feed_id,
        class_name: :Subscription,
        dependent: :destroy

    has_many :subscribers,
        through: :subscriptions,
        source: :subscriber

    has_many :articles,
        foreign_key: :feed_id,
        class_name: :Article,
        dependent: :destroy


    # before_validation :validate_feed, on: :create
    # after_initialize

    #before_validation (create)

    def validate_feed
        if rss_url.empty?
            errors.add :base,
                'The url field cannot be empty'
            throw: abort
        end

        begin
            @rss_feed = RSS::Parser.parse(open(rss_url).read, false)
        rescue 
            errors.add :base,
                "There was an issue fetching teh feed"
            throw :abort
        end
    end

    #before_validation

    def ensure_populate_default
        @populate = true
    end

    #after_validation (create)

    def populate_feed_metadata
        @rss_feed ||= RSS::Parser.parse(open(rss_url).read, false)

        self.title = "New Feed"
        self.description = @rss_feed.channel.description
        self.website_url = @rss_feed.channel.image.link
    end

    # def subscription_title(user)
    #     user.subscriptions.find_by(feed_id: id)&.title || title
    # end

    def populate_articles
        @rss_feed ||= RSS::Parser.parse(open(rss_url).read, false)

        @rss_feed.items.each do |article|
            unless 
    end
end
