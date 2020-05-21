export const fetchLatest = () => (
    $.ajax({
        url: 'api/articles',
        method: 'GET',
        // error: (err) => console.log(err)
    })
)

export const fetchArticle = id => (
    $.ajax({
        url: `api/articles/${id}`,
        method: 'GET'
    })
)

export const markRead = id => (
    $.ajax({
        url: 'api/reads',
        method: 'POST',
        data: { read: {article_id: id}}
    })
) 

export const markUnread = id => (
    $.ajax({
        url: `api/reads/${id}`,
        method: 'DELETE',
    })
)

export const fetchReads = (offset) => (
    $.ajax({
        url: 'api/reads',
        method: 'GET',
        data: { offset }
    })
)


