import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(e) {
        this.props.onClick(this.props.track);
        e.preventDefault();
    }

    render() {
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className='Track-action' onClick={this.handleAction}>{this.props.action}</a>
            </div>
        );
    }
}

export default Track;
