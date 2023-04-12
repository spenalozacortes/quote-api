const express = require('express');
const cors = require('cors');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = 8080;

app.use(express.static('public'));
app.use(cors());

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res) => {
    if (req.query.person != undefined) {
        const quotesByAuthor = quotes.filter(quote => quote.person == req.query.person);

        res.send({ quotes: quotesByAuthor });
    } else {
        res.send({ quotes: quotes });
    }
});

app.listen(PORT, () => {
    console.log("Server listening");
});