import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ArticleIndex from './article_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import {fetchUnsubscribedFeed, fetchLatest, fetchArticle} from '../../../actions/article_actions';
import { asArray } from '../../../reducers/selectors';
// debugger;

const mapStateToProps = (state, ownProps) => {
    const feeds = state.entities.feeds.byId;
    const id = ownProps.match.params.id;
    const path = ownProps.match.path.split('/')[2];
    const articlesById = state.entities.articles.byId;

    const feed = feeds[id] || {articles: []};
    feed.title = feed ? (feed.subscription_title || feed.title) : "";
    feed.titleLink = feed ? feed.website_url : null;

    const pathProps = {
        latest: {title: "Latest"},
        discover: {...feed, previewView: true},
        subscriptions: {...feed}
    };

    const articleIds = {
        latest: state.session.latest,
        subscriptions: feed.articles,
        discover: feed.articles
    };
    
    const articles = articleIds[path] ? articleIds[path].map(articleId => articlesById[articleId]) : null
    
    return {
        feeds,
        ...pathProps[path],
        articles
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const path = ownProps.match.path.split('/')[2];
    const fetchActions = {
        latest: (id) => dispatch(fetchLatest(id)),
        discover: (id) => dispatch(fetchUnsubscribedFeed(id)),
        subscriptions: (id, offset) => dispatch(fetchSingleFeed(id, offset))
    }

    return {
        // fetchLatest: () => dispatch(fetchLatest()),
        // fetchArticle: (articleId) => dispatch(fetchArticle(articleId))
        fetchAction: fetchActions[path]
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ArticleIndex)
);