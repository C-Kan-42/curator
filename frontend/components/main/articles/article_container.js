import { connect } from 'react-redux';
import ArticleIndex from './article_index';
import {fetchLatest, fetchArticle} from '../../../actions/article_actions';
import { asArray } from '../../../reducers/selectors';

const mapStateToProps = (state) => {
    // const id = ownProps.match.params.id;
    // const path = ownProps.match.path.split('/')[2];
    return {
        articles: asArray(state.entities)
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    // const path = ownProps.match.path.split('/')[2];
    // const fetchBenches = {
    //     latest: () => dispatch(fetchLatest())
    // }

    return {
        fetchLatest: () => dispatch(fetchLatest()),
        fetchArticle: (articleId) => dispatch(fetchArticle(articleId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleIndex);