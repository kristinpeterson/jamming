const queryString = require('query-string');
const apiBaseURL = 'https://api.spotify.com/v1';
const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
let accessToken;

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const parsedHash = queryString.parse(window.location.hash);
        const newAccessToken = parsedHash['access_token'];
        const newExpiry = parsedHash['expires_in'];

        if (newAccessToken && newExpiry) {
            accessToken = newAccessToken;
            window.setTimeout(() => accessToken = '', newExpiry * 1000);
            window.history.pushState('accessToken', null, '/');
            return accessToken;
        } else {
            const clientID = '99843be16e994f708d26801c1dd2a282';
            const responseType = 'token';
            const redirectURI = 'http://localhost:3000/';
            const scope = 'playlist-modify-private';
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURI}&scope=${scope}`;
        }
    },
    
    search(term) {
        const accessToken = Spotify.getAccessToken();
        const url = `${corsAnywhere}${apiBaseURL}/search?type=track&q=${term}`;
        return fetch(
                    url,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }
                ).then(
                    response => response.json(), 
                    networkError => console.log(networkError.message)
                ).then(
                    jsonResponse => {
                        if(jsonResponse.tracks) {
                            return jsonResponse.tracks.items.map(
                                track => {
                                    return {
                                        track: track.name,
                                        artist: track.album.artists[0].name,
                                        album: track.album.name
                                    }
                                }
                            );
                        }
                    }
                );
    }

};

export default Spotify;
