export const asArray = ({ articles }) => (
    Object.keys(articles).map(key => articles[key])
);