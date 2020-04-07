json.feeds do 
    json.byId do
        json.set! @article.feed.id do
            json.partial! 'api/feeds/feed', feed: @article.feed
            json.articles[@article.id]
        end
    end
end

json.articles do
    json.byId do
        json.set! @article.id do
            json.partial! "api/articles/article", article: @article
            json.feedInfo do
                json.id @article.feed.id
                json.title @article.feed.subscription_title(current_user)
            end
        end
    end
    json.allIds[@article.id]
end

json.subscriptions do
  json.byId do
    json.set! @article.feed.id do
      user_sub = current_user.subscriptions.find_by(feed_id: @article.feed)
      json.subscription_title user_sub&.title || @article.feed.title
      json.subscribed !!user_sub
    end
  end
end