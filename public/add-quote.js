const submitQuoteButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

const renderError = response => {
    newQuoteContainer.innerHTML = `<p>Your request returned an error:</p>
    <p>Code: ${response.status}</p>
    <p>${response.statusText}</p>`;
};

submitQuoteButton.addEventListener('click', () => {
    const quote = document.getElementById('quote').value;
    const person = document.getElementById('person').value;

    fetch(`http://localhost:8080/api/quotes?quote=${quote}&person=${person}`, {
        method: "post"
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                renderError(response);
            }
        })
        .then(({quote}) => {
            const newQuote = document.createElement('div');

            newQuote.innerHTML = `
            <h3>Congrats, your quote was added!</h3>
            <div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>`;

            newQuoteContainer.appendChild(newQuote);
        });
});
