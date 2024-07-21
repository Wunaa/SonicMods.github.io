const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { CLIENT_KEY, CLIENT_SECRET, REDIRECT_URI } = require('../config/config');

router.get('/', (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000, httpOnly: true });

    const url = new URL('https://www.tiktok.com/v2/auth/authorize/');
    url.searchParams.append('client_key', CLIENT_KEY);
    url.searchParams.append('scope', 'user.info.basic');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('state', csrfState);

    res.redirect(url.toString());
});

router.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    const csrfState = req.cookies.csrfState;

    if (state !== csrfState) {
        return res.status(403).send('Invalid state parameter');
    }

    const tokenResponse = await fetch('https://www.tiktok.com/v2/oauth/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_key: CLIENT_KEY,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI,
        }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenResponse.ok) {
        console.log('Access Token:', tokenData.access_token);
        res.send('Login successful');
    } else {
        res.status(500).send('Error exchanging code for token');
    }
});

module.exports = router;
