export const fetchFeedResults = q => (
    $.ajax({
        method: "GET",
        url: "api/feeds",
        data: { q }
    })
);

export const fetchUnsubscribedFeed = feedId => (
    $.ajax({
        method: "GET",
        url: `api/feeds/${feedId}`,
    })
);