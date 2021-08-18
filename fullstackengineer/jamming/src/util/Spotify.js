let accessToken = '';

const clientID = '768f32e988bc4c8382997950410bb5e4';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken () {
        if (accessToken) {
            return accessToken;
        }

        
        // Set the access token value
        accessToken = window.location.href.match(/access_token=([^&]*)/);
        // Set a variable for expiration time
        let expiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if(accessToken && expiresIn) {
            accessToken = accessToken.pop();
            expiresIn = expiresIn.pop();

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

    }
}

export default Spotify;