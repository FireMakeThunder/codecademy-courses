import React from 'react';
import './Track.css';

export default class Track extends React.Component {

    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    render() {
        const track = this.props.track;
        const name = track.name;
        const artist = track.artist;
        const album = track.album;

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{name}</h3>
                    <p>{artist} | {album}</p>
                </div>

                {this.renderAction()}

            </div>
        );
    }

    renderAction() {
        if (this.props.isRemoval)
            return <button className="Track-action" onClick={this.removeTrack}> - </button>;
        else 
            return <button className="Track-action" onClick={this.addTrack}> + </button>;
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

}