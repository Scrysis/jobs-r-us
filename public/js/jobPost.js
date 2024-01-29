
const form = document.querySelector('#job-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the job title and description from the form fields
  const title = document.querySelector('#job-title').value;
  const description = document.querySelector('#job-description').value;

  // Create a new job posting object
  const job = {
    title,
    description,
  };
  createJob(job);

  // Clear the form fields
  document.querySelector('#job-title').value = '';
  document.querySelector('#job-description').value = '';
});

// Create a function to create a new job posting
function createJob(job) {
  fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  })
    .then((response) => response.json())
    .then((data) => {
      // If the job posting was created successfully, redirect to the job details page
      if (data.success) {
        window.location.href = `/jobs/${data.id}`;
      } else {
        // If there was an error, display an error message
        alert(data.message);
      }
    })
    .catch((error) => {
      // If there was an error, display an error message
      alert(error.message);
    });
}
