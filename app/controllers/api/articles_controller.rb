class Api::ArticlesController < ApplicationController
    before_action :require_logged_in

    def index
        # article_arr = []
        # (0..4).each do |idx|
        #     article_arr.push(Article.create_nyt_article(idx))
        # end
        @articles = Article.all
        render :index
    end

    def show
        @article = Article.find(params[:id])
        
        if @article
            render :show
        else 
            render json: ["Cannot find article"], status: 404
        end

    end

end
