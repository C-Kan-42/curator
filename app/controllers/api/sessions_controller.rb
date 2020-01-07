class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user.nil?
            render json: ['Invalid credentials, please try again'], status: 401
        else
            login!(@user)
        end
    end

    def destroy
        if current_user
            logout!
            render json: {}
        else
            render json: ['No user to logout'], status: 404
        end
    end
end
