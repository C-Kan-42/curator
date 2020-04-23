import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import * as moment from 'moment';

// import Article

class ArticleIndexItem extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     hidden: false,
        //     isMouseInside: false
        // };
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(e, articleId) {
        const target = e.target.parentElement;
        // const articleId = this.props.article.id;
        const originPath = this.props.history.location.pathname;
        this.props.history.push(`${originPath}/articles/${articleId}`);
        // this.handle
    }

    handleExitClick(e) {
        e.preventDefault();
        // this.setState({hidden: true});
    }

    render() {
        const {article, feed} = this.props;
        const imageStyle = {
            backgroundImage: 'url(' + `"${article.image_url}"` + ')'
        };
        // const originPath = this.props.history.location.pathname;
        
        let timeSincePub = moment(article.pub_date).fromNow();
        timeSincePub = timeSincePub.split(" ")[0] === "in" ? "Just now" : timeSincePub.split(" ").slice(0,2).join(' ');

        return (
            <div className="article-index-item" onClick={e => this.handleRedirect(e, article.id)} className="entry unread u4">
                <div className="visual" style={imageStyle}>
                    {/* <img src={`${article.image_url}`} alt=""/> */}
                </div>
                <div className="content">
                    <a className="article-title" href={article.link}> 
                        {article.title}
                    </a>
                    <div className="metadata">
                        <span className="feed-source"> {!this.props.titleLink ?
                            <Link to={`/i/subscriptions/${article.feed_id}`}>
                                {feed.subscription_title}
                            </Link> : null
                        }</span>
                        <br></br>
                        <span className="authors">{`${article.author} / `}</span>
                        <span className="m-r-1 ago">{` ${timeSincePub}`}</span>
                    </div>
                    <div className="article-summary">
                        {article.description}
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleIndexItem;