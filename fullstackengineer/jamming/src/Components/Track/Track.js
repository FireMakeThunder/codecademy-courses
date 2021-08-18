import React from 'react';
import './Track.css';

export default class Track extends React.Component {

    renderAction() {
        return this.isRemoval ? '-' : '+';
    }

    render() {
        const name = this.props.name;
        const artist = this.props.artist;
        const album = this.props.album;

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{name}</h3>
                    <p>{artist} | {album}</p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        );
    }

}