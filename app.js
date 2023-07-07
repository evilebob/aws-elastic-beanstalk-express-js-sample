const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8080;

app.get('/', async (req, res) => {
    // The URL of the GNews API endpoint
    const url = 'https://gnews.io/api/v4/top-headlines?lang=en&country=us';

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send('An error occurred while fetching the latest news.');
    }
});

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
