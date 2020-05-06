# Curator

-----------
[Live Website Link](https://curator-1.herokuapp.com/#/)

This web app is a clone of Feedly, a popular news aggregator. With so many sources of news today, this site allows users to subscribe to your preferred news sources and organize them into feeds. Curator makes use of RSS Feeds, which hold raw data from news sources and allow users to bypass social media and advertisements while retaining access to their favorite articles. Curator enables users to curate and view their own personalized news page, with their favorite topics and sites neatly organized in one place. 

![](https://i.imgur.com/90cxFTX.png)

## Technology

This app uses Ruby on Rails for the backend API, and Javascript/React/Redux to render the front-end. 

## Features

Curator has a range of features including: 
* User authentication
* Automated article scraping of RSS feeds
* Article and feed pop outs
* Follow and unfollow feeds
* Dynamic search bar
* Read and unread article marking

A few highlighted features include: 

### Article Floating Modals

Users are able to click on individual articles on the show page, and a modal popout will appear on the right side of the screen. This was accomplished with a modal passing relevant articles props to a popout container, and also makes use of this.props.children.

![](https://i.imgur.com/uKQ6JhZ.jpg)

```
render() {
        return (
            <div onClick={this.handleClick} className={"pop-out-screen" +
                (this.state.appeared ? "" : " appearing")
            }>
                <Popout {...this.props} handleClose={this.handleClose}>
                    {this.props.children}
                </Popout>
            </div>
        );
}
```

### Dynamic Search Bar

Users are able to search for feeds by keyword, feed title, or rss url, through a search bar that dynamically re-renders as users continue typing. This is accomplished with the use of the #ransack method (Ruby on Rails) on the backend to filter search results, as well as React onChange event handlers and .setState on the frontend to dynamically re-render the results. 

![](https://i.imgur.com/g22Bb0Z.png)

```
----In main class----

 handleInputChange(e) {
        console.log('onChange result', e.target.value);
        this.setState({
            query: e.target.value
        })
        this.props.fetchFeedResults(e.target.value);
            // .then(res => 
            //     this.setState({filtered: res.data})
            //     console.log(res);
            // );
        //the action .fetchFeedResults takes care of the filtering for us, see feeds_controller.rb index method
        //we use the .ransack method to search
    };

----In function searchBar----

<div className="form-input-container">
        <input value={query} onChange={handleInputChange} type='text'
            placeholder='Search by topic, website, or RSS link'
            autoCorrect="on"
            style={styles}
            className="search-form-input" />
        <div className="search-form-overlay">
            <i className="search-icon"></i>
        </div>
</div>

```


## Acknowledgements

I would like to acknowledge [Elliot Grieco](https://github.com/etgrieco), as I referenced and got inspiration from his code for his Feedly clone, easyFeeds. I would also like to thank my project advisor, Michelle Kim, and my classmates at App Academy, for all their help and support. 
