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

app.use('/api/quotes/:id', (req, res, next) => {
    const index = getIndexById(req.params.id, quotes);

    if (index === -1) {
        return res.status(404).send();
    }

    req.index = index;
    next();
});

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
    const newQuote = createQuote(req.query);

    if (newQuote.quote && newQuote.person) {        
        quotes.push(newQuote);
        res.status(201).send({
            quote: newQuote
        });
    } else {
        res.status(400).send();
    }
});

app.put('/api/quotes/:id', (req, res) => {
    const updatedQuote = {
        quote: req.query.quote,
        person: req.query.person,
        id: req.params.id
    };

    quotes[req.index] = updatedQuote;
    res.send({ quote: updatedQuote });
});

app.delete('/api/quotes/:id', (req, res) => {
    quotes.splice(req.index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});