require 'rss'
require 'open-uri'
require 'metainspector'

class Article < ApplicationRecord
    validates :title, :link_url, :feed_id, presence:true
    validates :entry_id, uniqueness: {scope: :feed_id}

    belongs_to :feed, 
        class_name: :Feed,
        foreign_key: :feed_id

    has_many :readers,
        through: :feed,
        source: :subscribers

    has_many :subscriptions,
        through: :feed,
        source: :subscriptions

    def self.create_article(article_item, feed)
        page = MetaInspector.new(article_item.link)

        entry_id = article_item.link
        title = article_item.title || page.title
        author = article_item.author || page.best_author || feed.title || "Anonymous"
        pub_date = article_item.pubDate || page.meta['date'] || Time.now
        description = article_item.description || page.description
        image_url  = page.images.best

        Article.create!( 
            entry_id: entry_id,
            title: title,
            author: author,
            description: description,
            link_url: article_item.link,
            image_url: image_url,
            pub_date: pubDate,
            feed_id: feed.id
        )

    end
    
end
