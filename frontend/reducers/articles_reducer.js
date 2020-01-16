import { combineReducers } from 'redux';

import { RECEIVE_LATEST, RECEIVE_ARTICLE }  from '../actions/article_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';

const articlesReducer = (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_LATEST:
            return action.articles;
        case RECEIVE_ARTICLE:
            const newArticle = { [action.article.id]: action.article };
            return Object.assign({}, state, newArticle);
        case CLEAR_ENTITIES:
            return {};
        default:
            return state; 
    }
};

export default articlesReducer;
