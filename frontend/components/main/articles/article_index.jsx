import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import ArticleIndexItem from './article_index_item';

class ArticleIndex extends React.Component {
    componentDidMount() {
        // if (this.props.articles.length === 0) {
        //     this.props.fetchArticle(this.props.match.params.id)
        // }

        this.props.fetchLatest();
        // this.props.articles
    }

    render() {
        console.log(this.props);
        const articleItems = this.props.articles.map(article => (
            <ArticleIndexItem key={article.id} 
            article={article}
            history={this.props.history}
            />
        ));

        return(
            /* <ArticleIndexHeader {...{titleLink}}>{title}</ArticleIndexHeader>} */
            <div id="Frame">
                <div id="PageHolderFX" className="fx">
                    <div id="PageFX" className="container centered">
                        <div className="board presentation-4">
                            <div>
                                <header className="header row">
                                    <h1 className="col-xs-6 col-md-6">
                                        New York Times - Travel
                                </h1>
                                </header>
                                <div className="row">
                                    <div className="col-xs-12 col-xl-9">
                                        <h4 className="article-index-subtitle">Recent</h4>
                                        <div className="article-index list-entries">
                                            <div className="entrylist-chunk">
                                                {articleItems}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }

    // static defaultProps = {
    //     articles: [],
    //     title: ""
    // }
}

// const ArticleIndexHeader = ({ titleLink, title, children }) => (
//     <div>
//         <h2>
//             {titleLink ?
//                 <a href={titleLink} target="__blank">{children}</a>
//                 : children}
//         </h2>
//     </div>
// );

export default ArticleIndex;
