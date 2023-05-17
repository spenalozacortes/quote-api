const deleteQuoteButton = document.getElementById('delete-quote');
const deleteQuoteContainer = document.getElementById('quote-deleted');
const message = document.createElement('div');

deleteQuoteButton.addEventListener('click', () => {
    const id = document.getElementById('quote-id').value;

fetch(`http://localhost:8080/api/quotes/${id}`, {
        method: "delete"
    })
        .then(response => {
            if (response.ok) {
                message.innerHTML = "<h3>The quote was deleted!</h3>";
                deleteQuoteContainer.appendChild(message);
            } else {
                message.innerHTML = "<h3>Failed to delete quote</h3>";
                deleteQuoteContainer.appendChild(message);
            }
        });
});
