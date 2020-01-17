import { connect } from 'react-redux';

import { fetchArticle } from '../../../actions/article_actions';
import { ArticleShow } from './article_show';

const mapStateToProps = (state, ownProps) => {
    const article = state.entities.articles[ownProps.match.params.id];
    return {article}
};

const mapDispatchToProps = dispatch => ({
    fetchArticle: (articleId) => dispatch(fetchArticle(articleId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleShow));


