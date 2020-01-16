# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
require 'rss'
require 'open-uri'

#Article seed data
Article.delete_all
nyt_articles = RSS::Parser.parse(open('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml').read, false).items[0..5]
a1 = Article.create!( 
    entry_id: "1",
    title: nyt_articles[0].title,
    author: nyt_articles[0].dc_creator,
    description: nyt_articles[0].description,
    link_url: nyt_articles[0].link,
    image_url: 'https://i.olsh.me/icon?size=80..120..200&url=nytimes.com',
    pub_date: nyt_articles[0].pubDate,
    source_id: 1
)

a2 = Article.create!( 
    entry_id: "2",
    title: nyt_articles[1].title,
    author: nyt_articles[1].dc_creator,
    description: nyt_articles[1].description,
    link_url: nyt_articles[1].link,
    image_url: 'https://i.olsh.me/icon?size=80..120..200&url=nytimes.com',
    pub_date: nyt_articles[1].pubDate,
    source_id: 1
)

a3 = Article.create!( 
    entry_id: "3",
    title: nyt_articles[2].title,
    author: nyt_articles[2].dc_creator,
    description: nyt_articles[2].description,
    link_url: nyt_articles[2].link,
    image_url: 'https://i.olsh.me/icon?size=80..120..200&url=nytimes.com',
    pub_date: nyt_articles[2].pubDate,
    source_id: 1
)

a4 = Article.create!( 
    entry_id: "4",
    title: nyt_articles[3].title,
    author: nyt_articles[3].dc_creator,
    description: nyt_articles[3].description,
    link_url: nyt_articles[3].link,
    image_url: 'https://i.olsh.me/icon?size=80..120..200&url=nytimes.com',
    pub_date: nyt_articles[3].pubDate,
    source_id: 1
)

a5 = Article.create!( 
    entry_id: "5",
    title: nyt_articles[4].title,
    author: nyt_articles[4].dc_creator,
    description: nyt_articles[4].description,
    link_url: nyt_articles[4].link,
    image_url: 'https://i.olsh.me/icon?size=80..120..200&url=nytimes.com',
    pub_date: nyt_articles[4].pubDate,
    source_id: 1
)