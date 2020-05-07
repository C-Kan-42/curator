class Read < ApplicationRecord
    validates :reader_id, :article_id, presence:true
    # validates :article_id, uniqueness: {scope: :reader_id}

    belongs_to :reader,
        class_name: :User,
        foreign_key: :reader_id

    belongs_to :article,
        class_name: :Article,
        foreign_key: :article_id
end
