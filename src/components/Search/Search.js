import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleTermChange(e) {
      const term = e.target.value;
      this.setState( { term: term } );
    }

    handleSearch(e) {
        this.props.searchSpotify(this.state.term);
        e.preventDefault();
    }

    render() {
        return (
            <div className='Search'>
                <input onChange={this.handleTermChange} placeholder='Enter a Song, Album or Artist'/>
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );
    }
}

export default Search;
