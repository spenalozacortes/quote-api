const submitQuoteButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitQuoteButton.addEventListener('click', () => {
    const quote = document.getElementById('quote').value;
    const person = document.getElementById('person').value;

    fetch(`http://localhost:8080/api/quotes?quote=${quote}&person=${person}`, {
        method: "post"
    })
        .then(response => response.json())
        .then(({quote}) => {
            const newQuote = document.createElement('div');

            newQuote.innerHTML = `
            <h3>Congrats, your quote was added!</h3>
            <div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>`;

            newQuoteContainer.appendChild(newQuote);
        });
});
