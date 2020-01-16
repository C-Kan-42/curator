require 'rss'
require 'open-uri'

class Article < ApplicationRecord
    validates :title, :link_url, :source_id, presence:true
    # validates :entry_id, uniqueness: {scope: :source_id}

    # belongs_to :source 
    #     class_name: :Source 
    #     foreign_key: :source_id

    # def self.create_nyt_article(index)
    #     # article_results = []
    #     nyt_articles = RSS::Parser.parse(open('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml').read, false).items[0..5]
        
    #     #temporary fix before creating source
    #     # index = 1
    #     nyt_articles.each.with_index do |article, idx|
    #         if idx === index
    #            result = {entry_id: "#{idx}", title: article.title, author: article.dc_creator, description: article.description, link_url: article.link, image_url: 'image.png', pub_datetime: article.pubDate, source_id: 1}
    #         end
    #     end

    #     Article.create(result)
    # end
    
end
