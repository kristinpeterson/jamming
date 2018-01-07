import React, { Component } from 'react';
import './App.css';
import Search from '../Search/Search';
import Spotify from '../../util/Spotify';
import Results from '../Results/Results';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        results: [],
        playlist: [] 
      };
      this.searchSpotify = this.searchSpotify.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(
      results => {
        this.setState({
          results: results
        });
      }
    );
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Search searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <Results />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
