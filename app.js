const express = require('express');
const https = require('https');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    const url = 'https://api.newscatcherapi.com/v2/latest_headlines';
    const params = '?countries=US&topic=business';

    https.get(`${url}${params}`, {
        headers: {
            'x-api-key': 'qaRM1Isa6l94Y7Gg2yLe9hxB-TOV-zFznlKxcJlziIg'
        }
    }, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            if (apiRes.statusCode !== 200) {
                res.status(apiRes.statusCode).send(`Error from API: ${data}`);
                return;
            }
            
            try {
                res.send(JSON.parse(data));
            } catch (err) {
                console.log('Failed to parse response as JSON', data);
                res.status(500).send('Failed to parse response as JSON');
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send('An error occurred while fetching the latest news.');
    });
});

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
