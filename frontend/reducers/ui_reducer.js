import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import { RECEIVE_FEED_TITLE } from '../actions/ui_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';

const feedTitleReducer = (state = null, action) => {
    // console.log(action)
    switch (action.type) {
        case RECEIVE_FEED_TITLE:
            return action.feedTitle;
        case CLEAR_ENTITIES:
            return null;
        default:
            return state;
    }
};

const uiReducer = combineReducers({
    feedTitle: feedTitleReducer,
    modal: modalReducer
});

export default uiReducer;
