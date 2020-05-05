import React from 'react';
import ArticleContainer from './article_container';
import PopOut from '../popout';

export default props => (
    <PopOut {...props} closePath={'/i/discover'}>
        <ArticleContainer />
    </PopOut>
)