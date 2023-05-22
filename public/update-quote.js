const updateQuoteButton = document.getElementById('update-quote');
const updatedQuoteContainer = document.getElementById('updated-quote');

const renderError = response => {
    updatedQuoteContainer.innerHTML = `<p>Your request returned an error:</p>
    <p>Code: ${response.status}</p>
    <p>${response.statusText}</p>`;
};

updateQuoteButton.addEventListener('click', () => {
    const quote = document.getElementById('quote-update').value;
    const person = document.getElementById('person-update').value;
    const id = document.getElementById('quote-update-id').value;

    fetch(`http://localhost:8080/api/quotes/${id}?quote=${quote}&person=${person}`, {
        method: "put"
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                renderError(response);
            }
        })
        .then(({quote}) => {
            const updateQuote = document.createElement('div');

            updateQuote.innerHTML = `
            <h3>Congrats, your quote was updated!</h3>
            <div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>`;

            updatedQuoteContainer.appendChild(updateQuote);
        });
});
