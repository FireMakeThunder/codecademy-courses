import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
    super(props);

     this.state = {
        searchResults: [
          { id: '1', name: "Bogus", artist: "Lip Singers", album: "Plushy Slippers and Breakfast" },
          { id: '2', name: "Fantasy 4degrees", artist: "Jbx", album: "TrrT Flip" }
        ],

        playlistName: 'Fegue review',
        playlistTracks: [{ id: '3', name: "Total Bachnilation", artist: "Nacht Bacht", album: "An Ill-Mannered Cavalier "}]
     }

     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName  = this.updatePlaylistName.bind(this);
     this.savePlaylist  = this.savePlaylist.bind(this);
     this.search  = this.search.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          
          <SearchBar onSearch={this.search} />

          <div className="App-playlist">

            <SearchResults
              tracks={this.state.searchResults}
              onAdd={this.addTrack}
            />

            <Playlist
              name={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />

          </div>
          
        </div>

      </div>
    );
  }

  addTrack(track) {
    const playlistTracks = this.state.playlistTracks.slice();

    // Use the track’s id property to check if the current song is in the playlistTracks state.
    for (let playlistTrack of playlistTracks) {
      if (playlistTrack.id === track.id)
        return;
    }

    // If the id is new, add the song to the end of the playlist.
    playlistTracks.push(track);

    // Set the new state of the playlist
    this.setState({
      playlistTracks
    });
  }

  removeTrack(track) {
    // Uses the track’s id property to filter it out of playlistTracks
    const playlistTracks = this.state.playlistTracks.filter( playlistTrack => playlistTrack.id !== track.id);
  
    // Sets the new state of the playlist
    this.setState({
      playlistTracks
    });
  }

  updatePlaylistName (newName) {
    this.setState({
      playlistName: newName
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);

    this.SOMEMETHOD(trackURIs, this.state.playlistName);
  }

  search(term) {
    console.log(term);
  }

}

export default App;
