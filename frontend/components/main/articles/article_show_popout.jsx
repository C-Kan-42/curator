import React from 'react';
import ArticleShow from './article_show';
import Popout from '../popout';

const ArticleShowPopout = props => {
    const prevSource = props.match.params.prevSource;
    const prevId = props.match.params.prevId ?
        props.match.params.prevId : null;
    const prevURL = prevId ? `${prevSource}/${prevId}` : `${prevSource}`;

    // const newProps = {
    //     closePath: `/i/${prevURL}`
    // };

    return (
        <Popout {...props} closePath={`/i/${prevURL}`}>
            <ArticleShow />
        </Popout>
    )
}

export default ArticleShowPopout;

