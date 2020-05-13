import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import * as moment from 'moment';

class ArticleIndexItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false,
            read: Boolean(this.props.article.read),
            isMouseInside: false
        };
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleHideClick = this.handleHideClick.bind(this);
        this.handleReadClick = this.handleReadClick.bind(this);
    }

    handleRedirect(e, articleId) {
        const target = e.target.parentElement;
        // const articleId = this.props.article.id;
        const originPath = this.props.history.location.pathname;
        this.props.history.push(`${originPath}/articles/${articleId}`);
        // this.handle
    }

    handleHideClick(e) {
        e.preventDefault();
        this.setState({hidden : true});
        this.handleReadClick(e);
    }

    handleReadClick(e) {
        //need to check if article is in reads
        //if it is, send markUnread
        //if not, send markRead

        e.preventDefault();
        if (this.state.read && e.target.className.includes('mark-as-read')) {
            this.props.markUnread(this.props.article.id);
            this.setState({ read: false })
        } else if (!this.state.read) {
            this.props.readArticle(this.props.article.id);
            this.setState({ read: true })
        }
        
    };
    
    render() {
        const {article, feed} = this.props;
        const {isMouseInside} = this.state;
        const imageStyle = {
            backgroundImage: 'url(' + `"${article.image_url}"` + ')'
        };
        // const originPath = this.props.history.location.pathname;
        
        const articleIndexItemClass = "article-index-item"
            + (this.state.hidden ? " hidden" : "")
            + (this.state.read ? " read" : "");
            // + (this.props.condensedView ? " condensed" : "")

        let timeSincePub = moment(article.pub_date).fromNow();
        timeSincePub = timeSincePub.split(" ")[0] === "in" ? "Just now" : timeSincePub.split(" ").slice(0,2).join(' ');

        return (
            <div className={`${articleIndexItemClass}`} onClick={e => this.handleRedirect(e, article.id)} 
            className="entry unread u4"
            onMouseEnter={e => this.setState({isMouseInside: true})}
            onMouseLeave={e => this.setState({isMouseInside: false})}
            >
                <div className="visual" style={imageStyle}>
                </div>
                <div className="content">
                    <a className="article-title" href={article.link}> 
                        {article.title}
                    </a>
                    <button className={`hide ${isMouseInside ? "" : " hidden"}`}
                        title="Mark as read and hide" type="button" onClick={this.handleHideClick}>X</button>
                    <button className={`mark-as-read ${isMouseInside ? "" : " hidden"}`}
                        title="Mark as read" type="button" onClick={this.handleReadClick}>Check</button>
                    {/* <ReadButtons 
                        handleReadClick={this.handleReadClick}
                        handleHideClick={this.handleHideClick}
                        {...this.props}
                        {...this.state}
                    /> */}
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

const ReadButtons = ({ read, handleReadClick, handleHideClick, isMouseInside }) => (
    <div>
        <button className={`hide ${isMouseInside ? "" : " hidden"}`} 
        title="Mark as read and hide" type="button" onClick={handleHideClick}>X</button>
        <button className={`mark-as-read ${isMouseInside ? "" : " hidden"}`} 
        title="Mark as read" type="button" onClick={handleReadClick}>Check</button>
    </div>
);

export default ArticleIndexItem;