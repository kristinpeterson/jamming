import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: window.sessionStorage.getItem('term')
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        if(this.state.term) {
            this.handleSearch();
        }
    }

    handleTermChange(e) {
      const term = e.target.value;
      this.setState({ term: term });
    }

    handleSearch() {
        const term = this.state.term;
        this.props.clearResults();
        window.sessionStorage.setItem('term', term);
        this.props.searchSpotify(term);
    }

    render() {
        return (
            <div className='Search'>
                <input onChange={this.handleTermChange} 
                        placeholder='Enter a Song, Album or Artist'
                        value={this.state.term} />
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );
    }
}

export default Search;
