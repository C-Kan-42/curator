json.extract! article, :id, :entry_id, :title, :author, :description, :link_url, :image_url, :pub_date, :feed_id

json.read !article.reads