import { combineReducers } from 'redux';
import union from 'lodash/union';

import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';
import {
  REMOVE_FEED,
  RECEIVE_NEW_FEED,
  RECEIVE_ALL_SUBSCRIPTIONS,
} from "../actions/subscription_actions";
import {
  RECEIVE_LATEST, RECEIVE_READS, RECEIVE_READ, RECEIVE_UNREAD
} from "../actions/article_actions";
import { CLEAR_ENTITIES } from "../actions/session_actions";

const userReducer = (oldState = null, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.currentUser;
    case LOGOUT_CURRENT_USER:
      // debugger;
      return null
    default:
      return oldState;
  }
}

const subscriptionsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      return action.feeds.allIds;
    case RECEIVE_NEW_FEED:
      return union(state, action.feeds.allIds);
    case REMOVE_FEED:
      const id = action.feeds.allIds[0];
      return state.filter(el => el !== id);
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};

const latestArticlesReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_LATEST:
      return union(state, action.articles.allIds);
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};

const readsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  
  switch (action.type) {
    case RECEIVE_UNREAD:
      const id = action.articles.allIds[0];
      return state.filter(el => el !== id); //remove article from reads slice of state after marked unread
    case RECEIVE_READ:
      return union(action.articles.allIds, state) // union creates an array of unique values, in order, from all given arrays 
    case RECEIVE_READS:
      return action.articles.allIds;
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  currentUser: userReducer,
  subscriptions: subscriptionsReducer,
  latest: latestArticlesReducer,
  reads: readsReducer
});



