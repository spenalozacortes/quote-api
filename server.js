const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndexById, createQuote } = require('./utils');

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));

app.param('id', (req, res, next, id) => {
    const index = getIndexById(id, quotes);
    if (index !== -1) {
        req.index = index;
        next();
    } else {
        res.status(404).send("ID not found!");
    }
});

const validateQuote = (req, res, next) => {
    if (!req.query.quote || !req.query.person) {
        return res.status(400).send("Invalid quote!");
    }
    next();
};

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person != undefined) {
        const quotesByAuthor = quotes.filter(quote => quote.person == req.query.person);
        res.send({ quotes: quotesByAuthor });
    } else {
        res.send({ quotes: quotes });
    }
});

app.post('/api/quotes', validateQuote, (req, res, next) => {
    const newQuote = createQuote(req.query);
    quotes.push(newQuote);
    res.status(201).send({ quote: newQuote });
});

app.put('/api/quotes/:id', validateQuote, (req, res, next) => {
    const updatedQuote = {
        quote: req.query.quote,
        person: req.query.person,
        id: req.params.id
    };
    quotes[req.index] = updatedQuote;
    res.send({ quote: updatedQuote });
});

app.delete('/api/quotes/:id', (req, res, next) => {
    quotes.splice(req.index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});