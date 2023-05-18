const { quotes } = require('./data');

let idCounter = quotes.length;

const getRandomElement = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const getIndexById = (id, arr) => arr.findIndex(element => element.id === Number(id));

const createQuote = queryArguments => {
    idCounter++;
    return {
        quote: queryArguments.quote,
        person: queryArguments.person,
        id: idCounter
    }
};

module.exports = {
    getRandomElement,
    getIndexById,
    createQuote
};