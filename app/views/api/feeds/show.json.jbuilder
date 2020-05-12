all_articles = []

reads_join = "LEFT OUTER JOIN reads
ON reads.article_id = articles.id
AND reads.reader_id = #{current_user.id}"

json.articles({})
json.articles do
  json.byId({})
  json.byId do
    articles = @feed.articles
      .select("articles.*")
      .joins(reads_join) 
      .order('pub_date DESC')
      .limit(20)
    articles.each do |article|
      all_articles << article
      json.set! article.id do
        json.partial! 'api/articles/article', article: article
      end
    end
  end

  json.allIds
end

json.feeds do
  json.byId do
    json.set! @feed.id do
      json.partial! 'api/feeds/feed', feed: @feed
      json.articles([])
      json.articles all_articles.sort_by(&:pub_date).map(&:id).reverse
    end
  end
  json.allIds [@feed.id]
end

json.subscriptions do
  json.byId do
    json.set! @feed.id do
      json.subcription_title @feed.title # dummy data for proper rendering
      json.subscribed !!@feed.subscriptions.find_by(subscriber_id: current_user)
    end
  end
end