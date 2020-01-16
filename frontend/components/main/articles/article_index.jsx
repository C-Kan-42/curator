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
            // {...this.state}
            // {...this.props}
            />
        ));

        return(
            <div className="article-index">
                {/* <ArticleIndexHeader {...{titleLink}}>{title}</ArticleIndexHeader>} */}
                {articleItems}
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
