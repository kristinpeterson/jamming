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
        this.handleEnter = this.handleEnter.bind(this);
        if(this.state.term) {
            this.handleSearch();
        }
    }

    handleTermChange(e) {
      const term = e.target.value;
      window.sessionStorage.setItem('term', term);
      this.setState({ term: term });
    }

    handleSearch() {
        this.props.clearResults();
        this.props.searchSpotify(this.state.term);
    }

    handleEnter(e) {
        if (e.key === 'Enter') {
            this.handleSearch();
        }   
    }

    render() {
        return (
            <div className='Search'>
                <input onChange={this.handleTermChange} 
                        onKeyPress={this.handleEnter}
                        {...this.state.term ? {value: this.state.term} : {placeholder: 'Enter a Song, Album or Artist'}} />
                <a onClick={this.handleSearch}>SEARCH &crarr;</a>
            </div>
        );
    }
}

export default Search;
