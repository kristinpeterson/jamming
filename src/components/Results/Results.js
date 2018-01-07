import React, { Component } from 'react';
import './Results.css';
import TrackList from '../TrackList/TrackList';

class Results extends Component {
    render() {
        return (
            <div className='Results'>
                <h2>Results</h2>
                <TrackList results={this.props.results} />
            </div>
        );
    }
}

export default Results;
