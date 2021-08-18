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
          { name: "Bogus", artist: "Lip Singers", album: "Plushy Slippers and Breakfast" },
          { name: "Fantasy 4degrees", artist: "Jbx", album: "TrrT Flip" }
        ],

        playlistName: 'Fegue review',
        playlistTracks: [{ name: "Total Bachnilation", artist: "Nacht Bacht", album: "An Ill-Mannered Cavalier "}]
     }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} />
          </div>
        </div>

      </div>
    );
  }

}

export default App;
