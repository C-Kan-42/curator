require 'rss'
require 'open-uri'
require 'metainspector'

class Feed < ApplicationRecord
    attr_accessor :populate

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


    before_validation :validate_feed, on: :create
    after_initialize :ensure_populate_default, on: :create

    after_validation :populate_feed_metadata, on: :create, if: @populate
    after_create :populate_articles, if: @populate

    def self.popular 
        Feed  
            .order('subscriptions_count DESC')
            .limit(20)
    end

    #before_validation 
    def validate_feed
        if rss_url.empty?
            errors.add :base,
                'The url field cannot be empty'
            throw :abort
        end

        begin
            @rss_feed = RSS::Parser.parse(open(rss_url).read, false)
        rescue 
            errors.add :base,
                "We were unable to fetch the feed. Please check the URL and try again."
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
        if rss_url == 'https://www.wired.com/feed/rss'
            page_link = 'https://www.wired.com'
            favicon_url = MetaInspector.new(@rss_feed.items[0].link).images.favicon
        else
            page_link = @rss_feed.channel.image.link
        end
        @feed_page = MetaInspector.new(page_link)
        
        self.title = @feed_page.title || @rss_feed.channel.image.title || "New Feed"
        self.description = @feed_page.description || @rss_feed.channel.description
        self.website_url = @feed_page.url
        self.last_built = Time.now

        self.favicon_url = @feed_page.images.favicon || favicon_url
    end

    def subscription_title(user)
        user.subscriptions.find_by(feed_id: id)&.title || title
    end

    def populate_articles
        @rss_feed ||= RSS::Parser.parse(open(rss_url).read, false)

        @rss_feed.items.each do |article|
            unless articles.find_by(entry_id: article.link)
                Article.create_article(article, self)
            end
        end

        self.last_built = @rss_feed.items.map{ |art| Time.now } #fix this to reflect actual pubdate
        save
    end
end
