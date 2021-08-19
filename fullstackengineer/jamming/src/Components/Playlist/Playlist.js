import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList'

export default class Playlist extends React.Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    render() {
        return (
            <div className="Playlist">
                <input
                    defaultValue={this.props.name}
                    onChange={this.handleNameChange}
                />

                <TrackList
                    tracks={this.props.tracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />

                <button
                    className="Playlist-save"
                    onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }

    handleNameChange(e) {
        const newName = e.target.value;
        this.props.onNameChange(newName);
    }

}