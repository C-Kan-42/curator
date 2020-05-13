import * as ArticleAPIUtil from '../util/article_api_util';
import * as FeedAPIUtil from '../util/feed_api_util';
import { receiveSingleFeed } from './subscription_actions';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const RECEIVE_READS = 'RECEIVE_READS';
export const RECEIVE_READ = 'RECEIVE_READ';
export const RECEIVE_UNREAD = 'RECEIVE_UNREAD';

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

// fetch article
export const receiveArticle = commonAction(RECEIVE_ARTICLE);

// fetch reads
export const receiveReads = commonAction(RECEIVE_READS);

// create read article
export const receiveRead = commonAction(RECEIVE_READ);

// create unread article 
export const receiveUnread = commonAction(RECEIVE_UNREAD);

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

export const markRead = id => dispatch => (
    ArticleAPIUtil.markRead(id)
        .then(articlePayload => dispatch(receiveRead(articlePayload)))
)

export const markUnread = id => dispatch (
    ArticleAPIUtil.markUnread(id)
        .then(articlePayload => dispatch(receiveUnread(articlePayload)))
)

export const fetchReads = (offset) => dispatch => (
    ArticleAPIUtil.fetchReads(offset) 
        .then(articles => dispatch(receiveReads(articles)))
)