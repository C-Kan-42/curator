# get 20 most-recent stories
all_articles = []
subscription = @subscription
# p subscription
json.articles({})
json.articles do
  json.byId({})
  json.byId do
      articles = subscription
          .articles
          .select("articles.*")
          .order('pub_date DESC')
          .limit(20)
          .offset(params[:offset])
      
      articles.to_a.each do |article|
        all_articles << article
        json.set! article.id do
          json.partial! 'api/articles/article', article: article
        end
      end
  end
end

# get the user's subscribed feeds
json.feeds do
  feed = subscription.feed
  json.byId do
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed
      json.articles all_articles.sort_by(&:pub_date).map(&:id).reverse
    end
  end

  # get feedId (in an array for adding to subscriptions array)
  json.allIds [feed.id]
end

# get basic subscription info, organized by feed ID.
json.subscriptions do
  json.byId do
    json.set! subscription.feed_id do
      json.subscription_title subscription.title
      json.subscription_id subscription.id
      json.subscribed !!current_user.subscriptions.find_by(id: subscription.id)
    end
  end
end