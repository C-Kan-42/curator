import React from 'react';
import { Link } from 'react-router-dom';
import DiscoverIndexItem from './discover_index_item';

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            filteredData: [],
            data: [],
            dataBaseSearch: true
        }
    }

    componentDidMount() {
        this.props.fetchFeedResults(this.state.query);
    }

    handleInputChange = (e) => {
        console.log('onChange result', e.target.value)
        this.setState({
            query: event.target.value
        })
    };

    render() {
        const text = this.state.query.length === 0 ? "Popular Feeds" : "Results";

        return(
            <div className="discover-search-index">
                <div className="discover-items">
                    <h2>{text}</h2>
                    <DiscoverIndexItems {...this.props} />
                </div>
            </div>            
        );
    }

}

function DiscoverIndexItems({ feeds, ...feedActions }) {
    const results = feeds.results.length == 0 ?
        ["No Feeds Found"] :
        feeds.results.map(resultId => 
                <DiscoverIndexItem key={resultId} feed={feeds.byId[resultId]} {...feedActions} />
        );

    return (
        <div className="results">
            {results}
        </div>
    )
}

export default Discover;
