class Feed < ApplicationRecord
    validates :rss_url, presence: true

    has_many :subscriptions,
        foreign_key: :feed_id,
        class_name: :Subscription,
        dependent: :destroy

    # has_many :subscribers,
    #     through: :subscriptions,
    #     source: :subscriber

    has_many :articles,
        foreign_key: :source_id,
        class_name: :Article,
        dependent: :destroy

    # def subscription_title(user)
    #     user.subscriptions.find_by(feed_id: id)&.title || title
    # end
end
