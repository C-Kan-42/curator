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

rss_feed_url_1 = 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/travel/rss.xml'
nyt_articles = RSS::Parser.parse(open(rss_feed_url_1).read, false).items[0..5]
a1 = Article.create!( 
    entry_id: "1",
    title: nyt_articles[1].title,
    author: nyt_articles[1].author,
    description: nyt_articles[1].description,
    link_url: nyt_articles[1].link,
    image_url: 'https://lh3.googleusercontent.com/JCGArw70n3EpD2FFNmH27QvUqlw78jbSCvD6bkvDKhLDzc0Xpi_JWIS1EEE_4qV5g-tt9oM=s128',
    pub_date: nyt_articles[1].pubDate,
    source_id: 1
)

a2 = Article.create!( 
    entry_id: "2",
    title: nyt_articles[2].title,
    author: nyt_articles[2].author,
    description: nyt_articles[2].description,
    link_url: nyt_articles[2].link,
    image_url: 'https://lh3.googleusercontent.com/gDSrHOID9XEtqkUMUewC7lFJi4xr7FFCzl124FXgblHqX6DNt0BxDMjsYNoetHNbNxJAnZw=s128',
    pub_date: nyt_articles[2].pubDate,
    source_id: 1
)

a3 = Article.create!( 
    entry_id: "3",
    title: nyt_articles[3].title,
    author: nyt_articles[3].author,
    description: nyt_articles[3].description,
    link_url: nyt_articles[3].link,
    image_url: 'https://lh3.googleusercontent.com/5G2rQkZ_rlOMFGdtoX_wCW0oSs1IB8-Hq9-bgm6N9XduqgtmF-oc1FY_I9xrf5f9Ad9Yqg=s128',
    pub_date: nyt_articles[3].pubDate,
    source_id: 1
)

a4 = Article.create!( 
    entry_id: "4",
    title: nyt_articles[4].title,
    author: nyt_articles[4].author,
    description: nyt_articles[4].description,
    link_url: nyt_articles[4].link,
    image_url: 'https://lh3.googleusercontent.com/7ZWdFJWoXpIpWa24PZSLoG9976p7vPmIjKsTId92AAaZRIKj-eBkYGqjHsl35LsvPNIYDw=s128',
    pub_date: nyt_articles[4].pubDate,
    source_id: 1
)

a5 = Article.create!( 
    entry_id: "5",
    title: nyt_articles[5].title,
    author: nyt_articles[5].author,
    description: nyt_articles[5].description,
    link_url: nyt_articles[5].link,
    image_url: 'https://lh3.googleusercontent.com/zcr56ME2zMdDcT-3qEvjy9X-ZIMSb03V2oCkEiFnEfn7ElfiMnf4aqJUhLIMMov6aa8qN3k=s128',
    pub_date: nyt_articles[5].pubDate,
    source_id: 1
)

rss_feed_url_2 = 