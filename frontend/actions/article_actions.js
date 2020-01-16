import * as ArticleAPIUtil from '../util/article_api_util';

export const RECEIVE_LATEST = 'RECEIVE_LATEST';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';

export const receiveLatest = articles => ({
    type: RECEIVE_LATEST,
    articles
});

export const receiveArticle = article => ({
    type: RECEIVE_ARTICLE,
    article
});

export const fetchArticle = articleId => dispatch => (
    ArticleAPIUtil.fetchArticle(articleId)
        .then(article => dispatch(receiveArticle(article)))
);

export const fetchLatest = () => dispatch => (
    ArticleAPIUtil.fetchLatest()
        .then(articles => dispatch(receiveLatest(articles)))
);

