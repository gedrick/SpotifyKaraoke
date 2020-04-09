const spotify = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_SECRET,
  scopes: ['user-read-playback-state']
};

const login = {
  callback: process.env.CALLBACK_URL
};

const genius = {
  token: process.env.GENIUS_TOKEN
};

module.exports = {
  spotify,
  login,
  genius
};
