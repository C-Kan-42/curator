import * as SubscriptionApiUtil from '../util/subscription_api_util';
import { startFeedAction } from './loading_actions';

export const REMOVE_FEED = 'REMOVE_FEED';
export const RECEIVE_SINGLE_FEED = 'RECEIVE_SINGLE_FEED';
export const RECEIVE_NEW_FEED = 'RECEIVE_NEW_FEED';
export const RECEIVE_SUBSCRIPTION_ERRORS = 'RECEIVE_SUBSCRIPTION_ERRORS';
export const RECEIVE_ALL_SUBSCRIPTIONS = 'RECEIVE_ALL_SUBSCRIPTIONS';

const commonAction = type => payload => ({
    type,
    feeds: payload.feeds,
    subscriptions: payload.subscriptions,
    articles: payload.articles
});

export const receiveSingleFeed = commonAction(RECEIVE_SINGLE_FEED);
export const receiveNewFeed = commonAction(RECEIVE_NEW_FEED);

export const receiveAllSubscriptions = subscriptionsPayload => ({
    type: RECEIVE_ALL_SUBSCRIPTIONS,
    feeds: subscriptionsPayload.feeds,
    subscriptions: subscriptionsPayload.subscriptions
});

export const removeFeed = feedPayload => ({
    type: REMOVE_FEED,
    feeds: feedPayload.feeds,
    subscriptions: feedPayload.subscriptions
});

export const receiveSubscriptionErrors = errors => ({
    type: RECEIVE_SUBSCRIPTION_ERRORS,
    errors
});

export const fetchAllSubscriptions = () => dispatch => {
    return (
        SubscriptionApiUtil.fetchAllSubscriptions()
            .then(
                subscriptionsPayload =>
                    dispatch(receiveAllSubscriptions(subscriptionsPayload))
            )
    );
};

export const fetchSingleFeed = (feedId, offset) => dispatch => {
    return (
        SubscriptionApiUtil.fetchSingleFeed(feedId, offset)
            .then(
                feedPayload =>
                    dispatch(receiveSingleFeed(feedPayload)),
                errors =>
                    dispatch(receiveSubscriptionErrors(errors.responseJSON))
            )
    );
};

export const deleteFeed = feed => dispatch => (
    SubscriptionApiUtil.deleteSubscription(feed.subscription_id)
        .then(deletedFeed => dispatch(removeFeed(deletedFeed)))
);

export const updateSubscription = subscription => dispatch => {
    return SubscriptionApiUtil.updateSubscription(subscription)
        .then(
            updatedFeed => {
                return dispatch(receiveSingleFeed(updatedFeed));
            },
            errors => {
                return dispatch(receiveSubscriptionErrors(errors.responseJSON));
            });
};

export const createFeed = feed => dispatch => {
    dispatch(startFeedAction(["Subscribing to Feed..."]));
    return (
        SubscriptionApiUtil.createFeed(feed)
            .then(
                newFeed => dispatch(receiveNewFeed(newFeed)),
                errors => dispatch(receiveSubscriptionErrors(errors.responseJSON)))
    );
};