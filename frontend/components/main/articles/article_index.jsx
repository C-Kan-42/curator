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
        this.props.fetchAction(this.props.match.params.id)
            .then(res => {
                this.setState({ articles: res.articles })
            })
  
        this.articleIndex = document.querySelector(".article-index")
    }

    componentDidUpdate(prevProps) {
        const oldURL = prevProps.match.url;
        const newURL = this.props.match.url;
        if ((this.props.articles) && (oldURL !== newURL)) {
            this.props.fetchAction(this.props.match.params.id)
                .then(res => {
                    this.setState({ articles: res.articles })
                })
        } else if (oldURL !== newURL) {
            window.document.querySelector(".main-content").scrollTo(0, 0);
        }
    }

    render() {
        const { articles, feeds, title, titleLink, previewView, readView } = this.props;
        let articleItems;
        
        if (this.props.articles) {
            articleItems = 
                (this.props.articles.map(article => {
                    // const article = this.state.articles.byId[articleId]
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
                }))
        }
        
        
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
