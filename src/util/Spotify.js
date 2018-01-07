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
            const redirectURI = process.env.REACT_APP_REDIRECT_URI;
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
                            window.sessionStorage.setItem('term', '');
                            return jsonResponse.tracks.items.map(
                                track => {
                                    return {
                                        name: track.name,
                                        artist: track.album.artists[0].name,
                                        album: track.album.name,
                                        id: track.id
                                    }
                                }
                            );
                        }
                    }
                );
    },

    createPlaylist(userID, playlistName, tracks) {
        const url = `${corsAnywhere}${apiBaseURL}/users/${userID}/playlists`;
        return fetch(
                url,
                {   
                    method: 'POST',
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({name: playlistName, public: 'false'})
                }
            ).then(
                response => response.json(),
                networkError => console.log(networkError.message)
            ).then(
                jsonResponse => {
                    if(jsonResponse.id) {
                        const playlistID = jsonResponse.id;
                        Spotify.addTracks(userID, playlistID, tracks);
                    }
                }
            );
    },

    addTracks(userID, playlistID, tracks) {
        const url = `${corsAnywhere}${apiBaseURL}/users/${userID}/playlists/${playlistID}/tracks`;
        const uris = tracks.map(track => `spotify:track:${track.id}`);
        return fetch(
                url,
                {
                    method: 'POST',
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({uris: uris})
                }
            ).then(
                response => response.json(),
                networkError => console.log(networkError.message)
            ).then(
                jsonResponse => {
                    if(jsonResponse.snapshot_id) {
                        return jsonResponse.snapshot_id;
                    }
                }
            )
    },

    savePlaylist(playlistName, tracks) {
        const accessToken = Spotify.getAccessToken();
        const profileURL = `${corsAnywhere}${apiBaseURL}/me`;
        return fetch(
                profileURL,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            ).then(
                response => response.json(),
                networkError => console.log(networkError.message)
            ).then(
                jsonResponse => {
                    if(jsonResponse.id) {
                        const userID = jsonResponse.id;
                        Spotify.createPlaylist(userID, playlistName, tracks);
                    }
                }
            );
    }

};

export default Spotify;
