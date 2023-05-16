const express = require('express');
const cors = require('cors');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndexById } = require('./utils');

const PORT = process.env.PORT || 8080;

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

app.post('/api/quotes', (req, res) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };

    if (newQuote.quote && newQuote.person) {
        quotes.push(newQuote);
        res.status(201).send({
            quote: newQuote
        });
    } else {
        res.status(400).send();
    }
});

app.delete('/api/quotes/:id', (req, res) => {
    const index = getIndexById(req.params.id, quotes);

    if (index !== -1) {
        quotes.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.listen(PORT, () => {
    console.log("Server listening");
});