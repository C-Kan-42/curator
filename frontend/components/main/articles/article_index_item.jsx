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
        this.props.history.push(`/articles/${articleId}`);
    }

    handleExitClick(e) {
        e.preventDefault();
        // this.setState({hidden: true});
    }

    render() {
        const {article} = this.props;
        const imageStyle = {
            backgroundImage: `url(${article.image_url})`
        };
        // const originPath = this.props.history.location.pathname;
        
        // let timeSincePub = moment(article.pub_date).fromNow();
        // timeSincePub = timeSincePub.split(" ")[0] === "in" ? "Just now" : pub_date;

        return (
            <div className="article-index-item" onClick={e => this.handleRedirect(e, article.id)}>
                <div className="article-item-image" style={imageStyle} />
                <div className="article-details">
                    <div className="article-title">
                        <h4>
                            <Link to={`articles/${article.id}`}>
                                {article.title}
                            </Link>
                        </h4>
                    </div>

                    <div className="article-metadata">
                        <h5>
                            {` by ${article.author} / `}
                        </h5>
                        <p className="article-description">{article.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleIndexItem;