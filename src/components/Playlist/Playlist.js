import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'New Playlist'
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
      const name = e.target.value;
      this.setState({ name: name });
    }

    handleSave(e) {
        this.props.savePlaylist(this.state.name, this.props.tracks);
        this.setState({ name: 'New Playlist' });
        e.preventDefault();
    }

    render() {
        return (
            <div className='Playlist'>
                <input onChange={this.handleNameChange}
                        value={this.state.name} />
                <TrackList action='-' 
                            onClick={this.props.removeTrack} 
                            tracks={this.props.tracks} />
                <a className='Playlist-save'
                    onClick={this.handleSave}>SAVE PLAYLIST</a>
            </div>
        );
    }
}

export default Playlist;
