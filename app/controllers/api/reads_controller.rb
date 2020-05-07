class Api::ReadsController < ApplicationController
    before_action :require_logged_in

    def reads_sql_join
        "LEFT OUTER JOIN reads
        ON reads.article_id = articles.id
        AND reads.reader_id = #{current_user.id}"

    end

    def index
        #should return articles marked as read in user's current session
        @articles = current_user.articles
            .select("articles.*, reads.reader_id as read")
            .joins(reads_sql_join)
            .where("reads.id IS NOT NULL")
            .order("reads.updated_at DESC")
            .limit(20)
            .includes(:feed, :subscriptions)
        
        render 'api/stories/index'
        
    end

    def create
        #creates an entry if an article is marked as read
        @read = Read.new(
            article_id: read_params[:article_id],
            reader_id: current_user.id
        )

        if @read.save
            @article = Article 
                .select("articles.*, reads.reader_id as read")
                .joins(reads_sql_join)
                .includes(:feed, :subscriptions)
                .find_by(id: read_params[:article_id])
            render 'api/articles/show'
        else
            render json: @read.errors.full_messages, status: 422
        end

    end

    def destroy

    end

    def read_params
        params.require(:read).(:article_id)
    end

end
