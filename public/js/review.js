
const postReview = async (event) => {
    event.preventDefault();

    const first_name = document.querySelector('#firstName').value
    const last_name = document.querySelector('#lastName').value
    const review_rating = document.querySelector('#reviewRating').value
    const review_text = document.querySelector('#reviewText').value

    if(first_name && last_name && review_rating && review_text) {
        const response = await fetch('/api/jobs/:id/reviews/create', {
            method: 'POST',
            body: JSON.stringify({first_name, last_name, review_rating, review_text}),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            alert('Created!')
            document.location.replace('/api/jobs/:id')
        } else {
            alert('Could not submit. Please try again');
        }
    } 
};


document
    .querySelector('#reviewForm')
    .addEventListener('submit', postReview);
