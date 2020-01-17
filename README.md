# Curator

-----------
[Live Website Link](https://curator-1.herokuapp.com/#/)

This web app is a clone of Feedly, a popular news aggregator. With so many sources of news today, this site allows users to subscribe to your preferred news sources and organize them into feeds. Curator makes use of RSS Feeds, which hold raw data from news sources and allow users to bypass social media and advertisements while consuming their favorite articles. Curator enables users to curate and view their own personalized news page, with their favorite topics and sites neatly organized in one place. 

## Technology

This app uses Ruby on Rails for the backend API, and Javascript/React/Redux to render the front-end. 

## Features

### Article Floating Modals

Users are able to click on individual articles on the show page, and a modal popout will appear on the right side of the screen. This was accomplished with a modal passing relevant articles props to a popout container, and also makes use of this.props.children.

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

### Acknowledgements

I would like to acknowledge [Elliot Grieco](https://github.com/etgrieco), as I referenced and got inspiration from his code for his Feedly clone, easyFeeds. I would also like to thank my project advisor, Michelle Kim, and my classmates at App Academy, for all their help and support. 
