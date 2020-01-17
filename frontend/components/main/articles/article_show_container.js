import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchArticle } from '../../../actions/article_actions';
import ArticleShow from './article_show';

const mapStateToProps = (state, ownProps) => {
    const articleId = parseInt(ownProps.match.params.id);
    const article = state.entities.articles[ownProps.match.params.id];
    return {articleId, article}
};

const mapDispatchToProps = dispatch => ({
    fetchArticle: (articleId) => dispatch(fetchArticle(articleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleShow);


