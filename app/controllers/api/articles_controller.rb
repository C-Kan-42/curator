class Api::ArticlesController < ApplicationController
    before_action :require_logged_in

    def index     
        #eager_load is equivalent to reads_join
        reads_join = "LEFT OUTER JOIN reads 
                        ON reads.article_id = articles.id
                        AND reads.reader_id = #{current_user.id}"

        @articles = current_user.articles
            .eager_load(:reads)
            .select("articles.*, reads.reader_id as read")
            .where("reads.id IS NULL
                    OR reads.updated_at > :within_last_three_minutes",
                    within_last_three_minutes: Time.now - 180)
            .order('pub_date DESC')
            .limit(20)
            .includes(:feed, :subscriptions)
            
    end

    def show
        
        reads_join = "LEFT OUTER JOIN reads 
                        ON reads.article_id = articles.id
                        AND reads.reader_id = #{current_user.id}"

        @article = Article
                    .eager_load(:reads)
                    .select("articles.*, reads.reader_id as read")
                    .includes(:feed, :subscriptions)
                    .find_by(id: params[:id])
        
        if @article
            render :show
        else 
            render json: ["Cannot find article"], status: 404
        end
    end

end
