import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import ArticleIndexItem from './article_index_item';

class ArticleIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            title: "",
            titleLink: null
        }
    }

    componentDidMount() {
        // if (this.props.articles.length === 0) {
        //     this.props.fetchArticle(this.props.match.params.id)
        // }
        console.log(this.props)
        this.props.fetchAction()
        // if (this.props.articles.length === 0 || this.props.readView) {
        //     this.props.fetchAction(this.props.match.params.id);
        // }
        // this.props.fetchLatest();
        this.articleIndex = document.querySelector(".article-index")
    }

    componentDidUpdate(newProps) {
        const oldURL = this.props.match.url;
        const newURL = newProps.match.url;
        if (newProps.articles.length === 0 && oldURL !== newURL) {
            newProps.fetchAction();
        } else if (oldURL !== newURL) {
            window.document.querySelector(".main-content").scrollTo(0, 0);
        }
    }

    render() {
        const { articles, feeds, title, titleLink, previewView, readView } = this.props;
        
        console.log(this.props);
        console.log(this.state)
        const articleItems = articles.map(article => {
            const feed = feeds[article.feed_id];

            return (
                <ArticleIndexItem key={article.id} 
                article={article}
                feed={feed}
                titleLink={titleLink}
                history={this.props.history}
                {...this.state}
                {...this.props}
                />
            );
        });

        return(
            /* <ArticleIndexHeader {...{titleLink}}>{title}</ArticleIndexHeader>} */
            <div id="Frame">
                <div id="PageHolderFX" className="fx">
                    <div id="PageFX" className="container centered">
                        <div className="board presentation-4">
                            <div className="article-index">
                               <ArticleIndexHeader {...{titleLink}}>{title}</ArticleIndexHeader>
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

    
}

const ArticleIndexHeader = ({ titleLink, title, children }) => (
    <header className="header row">
        <h1 className="col-xs-6 col-md-6">
            {titleLink ?
                <a href={titleLink} target="__blank">{children}</a>
                : children}        
        </h1>
    </header>
);

export default ArticleIndex;
