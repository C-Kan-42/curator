json.articles({})

json.articles do
  json.byId do
    @articles.each do |article|
      json.set! article.id do
        json.partial! 'api/articles/article', article: article #change to api/articles/article
      end
    end
  end

  json.allIds @articles.map(&:id)
end

all_feeds =[]
json.feeds({})
json.feeds do 
  json.byId do
    @articles.each do |article|
      feed = article.feed
      all_feeds << feed
      json.set! feed.id do
        json.partial! 'api/feeds/feed', feed:feed
      end
    end
  end
end

json.subscriptions({})
json.subscriptions do
  json.byId do
    subscriptions = current_user.subscriptions
    subscriptions.each do |subscription|
      json.set! subscription.feed_id do
        json.subscription_title subscription.title
      end
    end
  end
end



