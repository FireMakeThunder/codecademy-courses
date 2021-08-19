import React from 'react';
import './App.css';

import Spotify from '../../util/Spotify';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
    super(props);

     this.state = {
        searchResults: [],

        playlistName: 'New Playlist',
        playlistTracks: []
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
          
          <SearchBar onSearch={this.search} userID={this.state.userID} />

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

  componentDidMount() {
    Spotify.getUserID().then(userID => {
      this.setState({userID});
    })
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
    this.setState({playlistTracks});
  }

  removeTrack(track) {
    // Uses the track’s id property to filter it out of playlistTracks
    const playlistTracks = this.state.playlistTracks.filter( playlistTrack => playlistTrack.id !== track.id);
  
    // Sets the new state of the playlist
    this.setState({playlistTracks});
  }

  updatePlaylistName (newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    Spotify.savePlaylist(
      this.state.playlistName,
      this.state.playlistTracks.map(track => track.uri)
    );

    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults});
    });
  }

}

export default App;
