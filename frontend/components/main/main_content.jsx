import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import LandingContainer from '../landing/landing_container';
import ArticleContainer from './articles/article_container';
import FeedsIndexContainer from './feeds/feeds_index_container';
import DiscoverContainer from './feeds/discover_container';
// import SubscriptionArticlesIndexPopout from './stories/subscription_stories_index_popout';
import ArticleShowPopout from './articles/article_show_popout';
import { receiveFeedTitle } from '../../actions/ui_actions';
// import throttle from 'lodash/throttle';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
        // throttledSessionBarScroll = throttle(e => this.onScroll(e), 50, { leading: true });
    }

    componentDidMount() {
        this.props.receiveFeedTitle(null)
        window.document.querySelector(".main-content")
            .addEventListener('scroll', this.throttledSessionBarScroll, false);
    }

    componentWillUnmount() {
        window.document.querySelector(".main-content")
            // .removeEventListener('scroll', this.throttledSessionBarScroll, false);
    }

    onScroll(e) {
        const titlePresent = Boolean(this.props.sessionBarTitle);

        if (e.target.scrollTop > 80 && !titlePresent) {
            this.props.receiveFeedTitle(this.getTitle());
        }
        else if (e.target.scrollTop < 80 && titlePresent) {
            this.props.receiveFeedTitle(null);
        }
    }

    getTitle() {
        const path = this.props.location.pathname.split("/")[2];

        const sessionTitles = {
            // discover: "Discover Feeds",
            feeds: "Organize Feeds",
            latest: "Latest",
            subscriptions: this.props.subscriptionTitle,
            // reads: "Recently Read"
        };

        return (sessionTitles[path] || "Welcome to Curator");
    }

    render() {
        const landingStyleProps = (this.props.match.path === "/" &&
            this.props.match.isExact) ||
            this.props.history.location.pathname === "/login" ||
            this.props.history.location.pathname === "/signup" ? { style: { padding: "0" } } : {};

        return (
            <section className="main-content" {...landingStyleProps}>
                <AuthRoute exact path="/" component={LandingContainer} />
                <AuthRoute path="/login" component={LandingContainer} />
                <AuthRoute path="/signup" component={LandingContainer} />
                <ProtectedRoute path="/i/feeds" component={FeedsIndexContainer} />
                <ProtectedRoute path="/i/latest" component={ArticleContainer} />
                {/* <ProtectedRoute path="/i/reads" component={ArticleContainer} /> */}
                <Switch>
                    <ProtectedRoute path="/i/:prevSource/:prevId/articles/:id" component={ArticleShowPopout} />
                    {/* <ProtectedRoute path="/i/discover/:id" component={SubscriptionStoriesIndexPopout} /> */}
                </Switch>
                <ProtectedRoute path="/i/discover" component={DiscoverContainer} />
                <ProtectedRoute path="/i/subscriptions/:id" component={ArticleContainer} />
                {/* <ProtectedRoute path="/i/collections/:id" component={ArticleContainer} /> */}
                <ProtectedRoute path="/i/:prevSource/articles/:id" component={ArticleShowPopout} />
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const feedsById = state.entities.feeds.byId;
    const id = ownProps.history.location.pathname.split("/")[3];
    const feed = feedsById[id] || { subscription_title: "" };
    const subscriptionTitle = feed.subscription_title || feed.title;
    return ({ subscriptionTitle, sessionBarTitle: state.ui.feedTitle });
}

const mapDispatchToProps = dispatch => ({
    receiveFeedTitle: title => dispatch(receiveFeedTitle(title))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MainContent)
);