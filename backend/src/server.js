// src/server.js
const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { authorize, getToken, listMessages, deals } = require('./gmail');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), listMessages);
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.get('/deals', (req, res) => {
    res.json(deals);
});

app.get('/oauth2callback', (req, res) => {
    const code = req.query.code;
    if (code) {
        fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            const credentials = JSON.parse(content);
            getToken(credentials, code, (auth) => {
                listMessages(auth);
                res.send('Authentication successful! You can close this window.');
            });
        });
    } else {
        res.send('No code found in query parameters.');
    }
});

cron.schedule('0 0 * * *', () => {
    console.log('Running a job at midnight to fetch new deals');
    fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content), listMessages);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
