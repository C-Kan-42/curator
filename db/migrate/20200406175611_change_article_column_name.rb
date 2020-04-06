class ChangeArticleColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :articles, :source_id, :feed_id
  end
end
