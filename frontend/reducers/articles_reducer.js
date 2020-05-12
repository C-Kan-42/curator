import { combineReducers } from 'redux';
// import _ from "lodash";
import merge from "lodash/merge";

import { RECEIVE_SINGLE_FEED, RECEIVE_NEW_FEED } from '../actions/subscription_actions';
import { RECEIVE_LATEST, RECEIVE_ARTICLE, RECEIVE_READS, RECEIVE_READ, RECEIVE_UNREAD }  from '../actions/article_actions';
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
        case RECEIVE_READS:
        case RECEIVE_READ:
        case RECEIVE_UNREAD:
            newState = merge({}, state, action.articles.byId);
            return newState;
        case CLEAR_ENTITIES:
            return {};
        default:
            return state; 
    }
};

export default combineReducers({
    byId: articlesById,
});
