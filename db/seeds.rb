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

#Feed seed data
Feed.destroy_all
puts "Destroyed all feeds!"
seed_urls = [
    'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    'https://feeds.npr.org/1019/rss.xml',
    'https://www.wired.com/feed/rss',
    'http://feeds.bbci.co.uk/news/world/rss.xml',
    'https://feeds.npr.org/1039/rss.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
]
#  'https://www.vox.com/rss/index.xml',
#  'https://www.theverge.com/rss/index.xml',
feeds = seed_urls.map do |url|
    puts "Fetching and scraping #{url}!"
    feed = Feed.new(rss_url: url)
    if feed.save
        puts "Successfully fetched and scraped #{url}!"
        feed 
    else  
        puts "Failed to fetch and scrape #{url}"
    end
end
.compact!

#User seed data
User.destroy_all
puts "Destroyed all users!"
users = Array.new(20) do
    user = User.new(
        email: Faker::Internet.unique.email,
        password: 'password',
        name: Faker::Movies::HitchhikersGuideToTheGalaxy.unique.character
    )

    user if user.save
end
users.compact!
puts "20 users created!"

#Subscription
Subscription.destroy_all
puts "Destroyed all subscriptions"
users.each do |user|
    feed_ids = Array.new(3) {Feed.all.sample.id}.compact

    feed_ids.uniq.each do |feed_id|
        sub = Subscription.new(
            subscriber_id: user.id,
            feed_id: feed_id
        )
        sub.title = Faker::Ancient.god if Random.rand(3) > 1
        sub.save
    end   
end

demoUser = User.new(
    email: 'demo-user@email.com',
    password: 'password',
    name: 'Demo User'
)
demoUser.save

feed_ids_demo = Array.new(3) {Feed.all.sample.id}.compact

feed_ids_demo.uniq.each do |feed_id|
    sub = Subscription.new(
        subscriber_id: demoUser.id,
        feed_id: feed_id
    )
    # sub.title = Faker::Ancient.god if Random.rand(3) > 1
    sub.save
end   

puts "Assigned 3 subscriptions for each user!"