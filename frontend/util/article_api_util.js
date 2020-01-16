export const fetchLatest = () => (
    $.ajax({
        url: 'api/articles',
        method: 'GET',
        error: (err) => console.log(err)
    })
)

export const fetchArticle = id => (
    $.ajax({
        url: `api/articles/${id}`,
        method: 'GET'
    })
)

