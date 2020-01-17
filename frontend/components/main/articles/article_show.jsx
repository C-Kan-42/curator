import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { ProtectedRoute } from '../../../util/route_util';
// import ArticleShowContainer from './article_show_container';
import { fetchArticle } from '../../../actions/article_actions';
import * as moment from 'moment';

class ArticleShow extends React.Component {
    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.articleId);
    }

    render() {
        let timeSincePub = moment(this.props.article.pub_date).fromNow();
        timeSincePub = timeSincePub.split(" ")[0] === "in" ? "Just now" : timeSincePub.split(" ").slice(0, 2).join(' ');

        return (
            <div className="entryholder">
                <div className="article-show-entry">
                    <div className="entryHeader">
                        <a href={`${this.props.article.link_url}`} className="entryTitle title read">{this.props.article.title}</a>
                        <div className="fx metadata">
                            <span className="metadata-holder">
                                <div className="metadata entryMetadata">
                                    <span className="source-metadata-holder">
                                        <p className="entry-source">New York Times - Travel</p>
                                    </span>
                                    <span className="authors">{`${this.props.article.author} / `}</span>
                                    <span className="m-r-1 ago">{` ${timeSincePub}`}</span>
                                </div>
                            </span>
                        </div>
                        <div className="shareBarHolder"></div>
                        <div className="tagsHolder decoration-holder"></div>
                    </div>
                    <div className="entryBody">
                        <div>
                            <span className="entry-imageContainer">
                                <img src={`${this.props.article.image_url}`} alt="" className="pinable" />
                            </span>
                        </div>
                        <div className="entry-content">
                            {this.props.article.description}
                        </div>
                    </div>
                    <div className="tagsHolder decoration-holder"></div>
                    <div id="wallHolder"></div>
                    <a href={`${this.props.article.link_url}`} className="fx-button secondary full-width visitWebsiteButton" target="_blank" rel="noopner">Visit Website</a>
                </div>
            </div>
        )
    }
}

ArticleShow.defaultProps = {
    article: {
        title: "",
        author: "",
        link_url: "",
        image_url: "",
        description: "",
        pub_date: ""
    }
};

const mapStateToProps = (state, ownProps) => {
    // const articleId = parseInt(ownProps.match.params.id);
    const article = state.entities.articles[ownProps.match.params.articleId];
    return { article }
};

const mapDispatchToProps = dispatch => ({
    fetchArticle: (articleId) => dispatch(fetchArticle(articleId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleShow));
