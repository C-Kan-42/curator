import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFeedResults } from '../../../actions/discovery_actions';
import {createFeed, deleteFeed } from '../../../actions/subscription_actions';
import { clearErrors } from '../../../actions/errors_actions';
import { fetchUnsubscribedFeed } from '../../../actions/article_actions';
import Discover from './discover';

const mapStateToProps = state => ({
    feeds: state.entities.feeds,
    errors: state.errors.feeds,
    loadingMessages: state.loading.messages
});

const mapDispatchToProps = dispatch => ({
    fetchFeedResults: query => dispatch(fetchFeedResults(query)),
    createFeed: feed => dispatch(createFeed(feed)),
    fetchUnsubscribedFeed: feedId => dispatch(fetchUnsubscribedFeed(feedId)),
    clearErrors: () => dispatch(clearErrors()),
    deleteFeed: feed => dispatch(deleteFeed(feed))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Discover);