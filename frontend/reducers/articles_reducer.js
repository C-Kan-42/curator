import { combineReducers } from 'redux';
// import _ from "lodash";
import merge from "lodash/merge";

import { RECEIVE_SINGLE_FEED, RECEIVE_NEW_FEED } from '../actions/subscription_actions';
import { RECEIVE_LATEST, RECEIVE_ARTICLE }  from '../actions/article_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';

const articlesById = (state = {}, action) => {
    Object.freeze(state)
    let newState;
    let newArticles;
    switch(action.type) {
        case RECEIVE_LATEST:
        case RECEIVE_SINGLE_FEED:
        case RECEIVE_NEW_FEED:
        case RECEIVE_ARTICLE:
        case RECEIVE_ARTICLE:
            newState = merge({}, state, action.articles.byId);
            return newState;
            // const newArticle = { [action.article.id]: action.article };
            // return Object.assign({}, state, newArticle);
        case CLEAR_ENTITIES:
            return {};
        default:
            return state; 
    }
};

export default combineReducers({
    byId: articlesById,
});
