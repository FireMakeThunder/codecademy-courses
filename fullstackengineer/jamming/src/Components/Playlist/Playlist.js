import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList'

export default class Playlist extends React.Component {

    render() {
        const name = this.props.name;
        const tracks = this.props.tracks;

        return (
            <div className="Playlist">
                <input defaultValue={name || 'New Playlist' }/>
                    <TrackList tracks={tracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }

}