import { combineReducers } from "redux";

import feedsReducer from './feeds_reducer';
import articlesReducer from './articles_reducer';

const entitiesReducer = combineReducers({
    feeds: feedsReducer,
    articles: articlesReducer
});

export default entitiesReducer;