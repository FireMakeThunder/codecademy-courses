let accessToken = '';

const clientID = '768f32e988bc4c8382997950410bb5e4';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
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
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.getAccessToken()
                }
            }
        ).then( response => {
            return response.json();
        }).then( jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            
            const tracks = jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    url: track.uri
                };
            });

            return tracks;
        })
    }
}

export default Spotify;