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
                        {...this.state.term ? {value: this.state.term} : {placeholder: 'Enter a Song, Album or Artist'}} />
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );
    }
}

export default Search;
