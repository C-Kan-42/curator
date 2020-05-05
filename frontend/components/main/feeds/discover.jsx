import React from 'react';
import { Link } from 'react-router-dom';
import DiscoverIndexItem from './discover_index_item';

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            filtered: [],
            searchForm: true
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchFeedResults(this.state.query);
    }

    handleInputChange(e) {
        console.log('onChange result', e.target.value);
        this.setState({
            query: e.target.value
        })
        this.props.fetchFeedResults(e.target.value);
            // .then(res => 
            //     this.setState({filtered: res.data})
            //     console.log(res);
            // );
        //the action .fetchFeedResults takes care of the filtering for us, see feeds_controller.rb index method
        //we use the .ransack method to search
    };

    render() {
        const text = this.state.query.length === 0 ? "Popular Feeds" : "Results";

        return(
            <div className="discover-search-index">

                { this.state.searchForm ? 
                    <SearchBar query={this.state.query} handleInputChange={this.handleInputChange} /> :
                    null
                }

                <div className="feed-results-row">
                    <div className="results-container">
                        <div className="results-title-container">
                            <h2 className="discover-title-text">{text}</h2>
                        </div>
                        <DiscoverIndexItems {...this.props } />
                    </div>
                </div>
                
            </div>            
        );
    }

}

function SearchBar({query, handleInputChange}) {
    let styles = {
        'paddingLeft': '44px',
        'paddingRight': '100px'
    };

    return (
        <div className="search-container">
            <p className="search-description">Discover the best sources for any topic</p>
            <form className="search-form">
                <div className="form-input-container">
                    <input value={query} onChange={handleInputChange} type='text'
                        placeholder='Search by topic, website, or RSS link'
                        autoCorrect="on"
                        style={styles}
                        className="search-form-input" />
                    <div className="search-form-overlay">
                        <i className="search-icon"></i>
                    </div>
                </div>
            </form>
        </div>
    )
} 

function DiscoverIndexItems({ feeds, ...feedActions}) {
    const results = feeds.results.length == 0 ?
        ["No Feeds Found"] :
        feeds.results.map(resultId => 
            <DiscoverIndexItem key={resultId} feed={feeds.byId[resultId]} {...feedActions} />
        );

    return (
        <div className="feed-results-list">
            {results}
        </div>
    )
}

export default Discover;
