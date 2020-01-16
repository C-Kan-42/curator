class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :entry_id
      t.string :title, null:false
      t.string :author
      t.text :description
      t.string :link_url, null:false
      t.string :image_url
      t.integer :source_id, null:false
      t.timestamps
    end

    add_index :articles, [:source_id, :entry_id], unique:true
  end
end
