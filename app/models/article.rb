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

    has_many :reads,
        foreign_key: :article_id,
        class_name: :Read,
        dependent: :destroy

    def self.create_article(article, feed)
        page = MetaInspector.new(article.link)

        entry_id = article.link
        title = article.title || page.title
        author = article.author || page.best_author || article.dc_creator || feed.title || "Anonymous"
        if author == "" 
            author = article.dc_creator
        end
        pub_date = article.pubDate || page.meta['pdate'] || Time.now
        description = article.description || page.description
        image_url  = page.images.best

        Article.create!( 
            entry_id: entry_id,
            title: title,
            author: author,
            description: description,
            link_url: article.link,
            image_url: image_url,
            pub_date: pub_date,
            feed_id: feed.id
        )

    end
    
end
