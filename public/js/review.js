
const postReview = async (event) => {
    event.preventDefault();


    const review_rating = document.querySelector('#reviewRating').value
    const review_text = document.querySelector('#reviewText').value
    const job_id = document.querySelector('#jobId').value

    if(review_rating && review_text) {
        const response = await fetch('/api/jobs/:id/reviews/create', {
            method: 'POST',
            body: JSON.stringify({review_rating, review_text, job_id}),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            alert('Created!')
            document.location.replace('/dashboard')
        } else {
            alert('Could not submit. Please try again');
        }
    } 
};


document
    .querySelector('#reviewForm')
    .addEventListener('submit', postReview);
