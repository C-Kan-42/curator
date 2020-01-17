import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { ProtectedRoute } from '../../../util/route_util';
// import ArticleShowContainer from './article_show_container';
import { fetchArticle } from '../../../actions/article_actions';
import * as moment from 'moment';

class ArticleShow extends React.Component {
    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.id);
    }

    render() {
        let { article } = this.props;
        const { description, image_url, link_url, title } = article;
        let timeSincePub = moment(article.pub_date).fromNow();
        timeSincePub = timeSincePub.split(" ")[0] === "in" ? "Just now" : timeSincePub.split(" ").slice(0, 2).join(' ');

        return (
            <div className="article-show-entry">
                <div className="entryHeader">
                    <a href={`${link_url}`} className="entryTitle title read">{title}</a>
                    <div className="fx metadata">
                        <span className="metadata-holder">
                            <div className="metadata EntryMetadata">
                                <span className="source-metadata-holder">
                                    <p className="source">New York Times - Travel</p>
                                </span>
                                <span className="authors">{`${article.author} / `}</span>
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
                            <img src={`${image_url}`} alt="" className="pinable"/>
                        </span>
                    </div>
                    <div className="entry-content">
                        {description}
                    </div>
                </div>
                <div className="tagsHolder decoration-holder"></div>
                <div id="wallHolder"></div>
                <a href={`${link_url}`} className="fx-button secondary full-width visitWebsiteButton">Visit Website</a>
            </div>
        )
    }
}

export default ArticleShow;