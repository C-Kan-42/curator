import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ArticleIndex from './article_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import {fetchUnsubscribedFeed, fetchLatest, fetchArticle} from '../../../actions/article_actions';
import { asArray } from '../../../reducers/selectors';
// debugger;

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const feeds = state.entities.feeds.byId;
    const id = ownProps.match.params.id;
    const path = ownProps.match.path.split('/')[2];
    const articlesById = state.entities.articles.byId;

    const feed = feeds[id] || {articles: []};
    feed.title = feed ? (feed.subscription_title || feed.title) : "";
    feed.titleLink = feed ? feed.website_url : null;

    const pathProps = {
        latest: {title: "Latest"},
        subscriptions: {...feed}
    };

    const articleIds = {
        latest: Object.keys(state.entities.articles.byId),
        subscriptions: feed.articles
    };
    
    console.log(articleIds)
    // console.log(path)
    const articles = articleIds[path] ? articleIds[path].map(articleId => articlesById[articleId]) : null
    console.log(articles)
    
    return {
        feeds,
        ...pathProps[path],
        articles
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const path = ownProps.match.path.split('/')[2];
    console.log(path)
    // const fetchBenches = {
    //     latest: () => dispatch(fetchLatest())
    // }
    const fetchActions = {
        latest: () => dispatch(fetchLatest()),
        subscriptions: (id, offset) => dispatch(fetchSingleFeed(id, offset))
    }

    return {
        // fetchLatest: () => dispatch(fetchLatest()),
        // fetchArticle: (articleId) => dispatch(fetchArticle(articleId))
        fetchAction: fetchActions[path]
    };
}

export default  connect(
        mapStateToProps,
        mapDispatchToProps
    )(ArticleIndex);