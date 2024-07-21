require('dotenv').config();

module.exports = {
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
};
