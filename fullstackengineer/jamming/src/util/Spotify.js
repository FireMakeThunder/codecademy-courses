let accessToken = '';

const clientID = 'REPLACE WITH YOUR ID';
const redirectURI = 'http://localhost:3000/';

const spotifyURL= 'https://api.spotify.com/v1';

const Spotify = {
    requestURL(endpointWithSlash, params) {
        let url = spotifyURL + endpointWithSlash;

        if (params) {
            let queries = [];

            for (const param in params) {
                queries.push(`${param}=${params[param]}`);
            }

            url += '?' + queries.join('&');
        }

        return url;
    },

    getAccessToken () {
        if (accessToken) {
            return accessToken;
        }

        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            // Set the access token value
            accessToken = accessTokenMatch.pop();
            // Set a variable for expiration time
            let expiresIn = expiresInMatch.pop();

            // Clear access token when it expires
            window.setTimeout(() => {
                accessToken = '';
            }, expiresIn * 1000);

            // Clear the parameters from the URL so the app doesn't
            // try grabbing the access token after it has expired
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        }

        // Redirect the user to the authorization URI
        const spotifyAuthorizeURI = (
            `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        );

        window.location = spotifyAuthorizeURI;

    },

    search(term) {
        return fetch(
            Spotify.requestURL('/search', {type: 'track', q: term}), {
            headers: {...this.getAuthorization()}

        }).then( response => {
            return response.json();

        }).then( jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    getAuthorization() {
        return {'Authorization': `Bearer ${this.getAccessToken()}`};
    },

    async getUserID() {
        const response = await fetch(Spotify.requestURL('/me'), {
            headers: {...this.getAuthorization()}
        });

        const jsonResponse = await response.json();

        if (!jsonResponse) {
            return '';
        }
        
        return jsonResponse.id;
    },

    async savePlaylist(name, trackURIs) {
        if(!(name && trackURIs)) {
            return;
        }

        const userID = await Spotify.getUserID();
        
        let playlistID = await fetch(Spotify.requestURL(`/users/${userID}/playlists`), {
            method: 'POST',
            headers: {...this.getAuthorization()},
            body: JSON.stringify({name})

        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(jsonResponse) return jsonResponse.id;
        });


        return fetch(Spotify.requestURL(`/playlists/${playlistID}/tracks`), {
            method: 'POST',
            headers: {
                ...this.getAuthorization(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uris: trackURIs})

        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(jsonResponse) return jsonResponse.id;
        });

        
    }

}

export default Spotify;