class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :subscriber_id, null: false
      t.integer :feed_id, null: false
      t.string :title, default: ""

      t.timestamps
    end
    add_index :subscriptions, [:subscriber_id, :feed_id], unique: true
    add_index :subscriptions, :title
  end
end
