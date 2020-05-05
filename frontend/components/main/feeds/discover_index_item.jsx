import React from 'react';
import {Link} from 'react-router-dom';

function DiscoverIndexItem({ feed, deleteFeed, createFeed }) {

    return (
        <div key={feed.id} className="feed-discover-item">
            <div className="feed-visual"
                title={feed.title}
                style={{backgroundImage: `url(${feed.favicon_url})`}}
            >
            </div>
            <div className="feed-discover-content">
                <div className="feed-discover-header-container">
                    <div className="feed-discover-title">
                        <Link to={`/i/discover/${feed.id}`}>
                            <h3 className="feed-discover-title-link">{feed.title}</h3>
                        </Link>
                    </div>
                    <div className="feed-discover-button-container">
                        <div className="feed-discover-buttons">
                            <div className="follow-button-floated">
                                {feed.subscribed ? 
                                    <UnsubscribeButton {...{feed, deleteFeed}} /> :
                                    <SubscribeButton {...{feed, createFeed}} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feed-discover-metadata">
                    <a href={feed.website_url} title={feed.website_url}
                    target="blank" rel="noopner noreferrer"
                    className="feed-discover-metadata-item">
                        {feed.website_url}
                    </a>
                </div>
                <div className="feed-discover-description">
                    {feed.description}
                </div>
            </div>
        </div>
    );
}

class UnsubscribeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
    };

    render() {
        return(
            <button className="unfollow-button discover-button"
                onMouseOver={e => this.setState({ hovering: true })}
                onMouseLeave={e => this.setState({ hovering: false })}
                onClick={e => this.props.deleteFeed(this.props.feed)}>
                {this.state.hovering ? "Unfollow" : "Following"}
            </button>
        );
    }
}

function SubscribeButton({feed, createFeed }) {
    return (
        <button className="follow-button discover-button"
            onClick={e => createFeed(feed)}>
            Follow
        </button>
    );
}

export default DiscoverIndexItem;