class Api::ArticlesController < ApplicationController
    before_action :require_logged_in

    def index     
        @articles = current_user.articles
            .select("articles.*")
            .order('pub_date DESC')
            .limit(20)
            .includes(:feed, :subscriptions)
    end

    def show
        @article = Article
                    .select("articles.*")
                    .includes(:feed, :subscriptions)
                    .find_by(id: params[:id])
        
        if @article
            render :show
        else 
            render json: ["Cannot find article"], status: 404
        end
    end

end
