class CreateFeeds < ActiveRecord::Migration[5.2]
  def change
    create_table :feeds do |t|
      t.string :title, null: false, default: ""
      t.string :rss_url, null: false
      t.string :description, default: ""
      t.string :favicon_url, default: ""
      t.string :website_url, null: false, default: ""
      t.integer :subscriptions_count, default: 0
      t.datetime :last_built

      t.timestamps
    end
    add_index :feeds, :title
    add_index :feeds, :rss_url, unique: true
  end
end
