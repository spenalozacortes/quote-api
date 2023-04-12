const fetchRandomButton = document.getElementById('fetch-random');
const fetchAllQuotes = document.getElementById('fetch-all');
const fetchByAuthor = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');

const resetQuotes = () => {
    quoteContainer.innerHTML = '';
};

const renderError = response => {
    quoteContainer.innerHTML = `<p>Your request returned an error:</p>
    <p>Code: ${response.status}</p>
    <p>${response.statusText}</p>`;
};

const renderQuotes = (quotes = []) => {
    resetQuotes();
    if (quotes.length > 0) {
        quotes.forEach(quote => {
            const newQuote = document.createElement('div');
            newQuote.className = 'single-quote';
            newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>`;
            quoteContainer.appendChild(newQuote);
        });
    } else {
        quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
    }
};

fetchRandomButton.addEventListener('click', () => {
    fetch('http://localhost:8080/api/quotes/random')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                renderError(response);
            }
        })
        .then(response => {
            renderQuotes([response.quote]);
        });
});

fetchAllQuotes.addEventListener('click', () => {
    fetch('http://localhost:8080/api/quotes')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                renderError(response);
            }
        })
        .then(response => {
            renderQuotes(response.quotes);
        });
});

fetchByAuthor.addEventListener('click', () => {
    const author = document.getElementById('author').value;

    fetch(`http://localhost:8080/api/quotes?person=${author}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                renderError(response);
            }
        })
        .then(response => {
            renderQuotes(response.quotes);
        });
})