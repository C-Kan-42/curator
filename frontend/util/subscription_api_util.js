export const fetchSingleFeed = (feedId, offset = 0) => (
    $.ajax({
        method: "GET",
        url: `api/subscriptions/${feedId}`,
        data: {
            offset
        }
    })
);

// gives subscriptions & feeds
export const fetchAllSubscriptions = () => (
    $.ajax({
        method: "GET",
        url: `api/subscriptions/`
    })
);

export const deleteSubscription = subID => (
    $.ajax({
        method: "DELETE",
        url: `api/subscriptions/${subID}`
    })
);

export const updateSubscription = subscription => (
    $.ajax({
        method: "PATCH",
        url: `api/subscriptions/${subscription.id}`,
        data: { subscription }
    })
);

export const createFeed = feed => (
    $.ajax({
        method: "POST",
        url: "api/subscriptions",
        data: { subscription: feed }
    })
);