class CreateReads < ActiveRecord::Migration[5.2]
  def change
    create_table :reads do |t|
      t.integer :reader_id, null: false
      t.integer :article_id, null: false

      t.timestamps
    end

    add_index :reads, [:reader_id, :article_id], unique: true
  end
end
