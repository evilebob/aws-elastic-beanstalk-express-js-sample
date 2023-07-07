const express = require('express');
const https = require('https');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    const url = 'https://api.newscatcherapi.com/v1/latest_headlines';

    https.get(url, {
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': 'qaRM1Isa6l94Y7Gg2yLe9hxB-TOV-zFznlKxcJlziIg'
        }
    }, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send('An error occurred while fetching the latest news.');
    });
});

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
