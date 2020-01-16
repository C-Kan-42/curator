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
    title: nyt_articles[0].title,
    author: nyt_articles[0].dc_creator,
    description: nyt_articles[0].description,
    link_url: nyt_articles[0].link,
    image_url: 'https://static01.nyt.com/images/2020/01/23/travel/23brexit-travel/merlin_99209932_2ee13f44-d6d4-46e6-8f13-b7561225a319-thumbWide.jpg?quality=75&auto=webp&disable=upscale',
    pub_date: nyt_articles[0].pubDate,
    source_id: 1
)

a2 = Article.create!( 
    entry_id: "2",
    title: nyt_articles[1].title,
    author: nyt_articles[1].dc_creator,
    description: nyt_articles[1].description,
    link_url: nyt_articles[1].link,
    image_url: 'https://static01.nyt.com/images/2020/01/10/t-magazine/oakImage-1578686701440/oakImage-1578686701440-thumbWide-v2.jpg?quality=75&auto=webp&disable=upscale',
    pub_date: nyt_articles[1].pubDate,
    source_id: 1
)

a3 = Article.create!( 
    entry_id: "3",
    title: nyt_articles[2].title,
    author: nyt_articles[2].dc_creator,
    description: nyt_articles[2].description,
    link_url: nyt_articles[2].link,
    image_url: 'https://static01.nyt.com/images/2020/01/18/realestate/18real-morocco02-inyt/18real-morocco02-inyt-thumbWide.jpg?quality=75&auto=webp&disable=upscale',
    pub_date: nyt_articles[2].pubDate,
    source_id: 1
)

a4 = Article.create!( 
    entry_id: "4",
    title: nyt_articles[3].title,
    author: nyt_articles[3].dc_creator,
    description: nyt_articles[3].description,
    link_url: nyt_articles[3].link,
    image_url: 'https://static01.nyt.com/images/2020/01/15/multimedia/15xp-peru/merlin_155176854_c53ba096-84bf-44f7-89c3-08f118553594-thumbWide.jpg?quality=75&auto=webp&disable=upscale',
    pub_date: nyt_articles[3].pubDate,
    source_id: 1
)

a5 = Article.create!( 
    entry_id: "5",
    title: nyt_articles[4].title,
    author: nyt_articles[4].dc_creator,
    description: nyt_articles[4].description,
    link_url: nyt_articles[4].link,
    image_url: 'https://static01.nyt.com/images/2020/01/15/realestate/15IHH-CANADA-slide-W7RI/15IHH-CANADA-slide-W7RI-thumbWide.jpg?quality=75&auto=webp&disable=upscale',
    pub_date: nyt_articles[4].pubDate,
    source_id: 1
)