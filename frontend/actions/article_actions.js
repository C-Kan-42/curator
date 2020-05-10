import * as ArticleAPIUtil from '../util/article_api_util';
import * as FeedAPIUtil from '../util/feed_api_util';
import { receiveSingleFeed } from './subscription_actions';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';

const commonAction = type => payload => ({
    type,
    feeds: payload.feeds,
    subscriptions: payload.subscriptions,
    articles: payload.articles
});

// export const receiveLatest = commonAction(RECEIVE_LATEST);
export const receiveLatest = (payload) => ({
    type: RECEIVE_LATEST,
    feeds: payload.feeds,
    subscriptions: payload.subscriptions,
    articles: payload.articles
})

export const receiveArticle = commonAction(RECEIVE_ARTICLE);

export const fetchArticle = articleId => dispatch => (
    ArticleAPIUtil.fetchArticle(articleId)
        .then(article => dispatch(receiveArticle(article)))
);

export const fetchLatest = () => dispatch => (
    ArticleAPIUtil.fetchLatest()
        .then(articles => dispatch(receiveLatest(articles)))
);

export const fetchUnsubscribedFeed = feedId => dispatch => (
    FeedAPIUtil.fetchUnsubscribedFeed(feedId)
        .then(feedPayload => dispatch(receiveSingleFeed(feedPayload)))
);
