const postJob = async (event) => {
    event.preventDefault();

    const job_title = document.querySelector('#jobTitleInput').value
    const salary = document.querySelector('#jobSalaryInput').value
    const description_text = document.querySelector('#jobDescriptionInput').value
    const requirements_text = document.querySelector('#jobRequirementsInput').value

    if(job_title && salary && description_text && requirements_text) {
        const response = await fetch('/api/jobs/create', {
            method: 'POST',
            body: JSON.stringify({job_title, salary, description_text, requirements_text}),
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
    .querySelector('#postJob-form')
    .addEventListener('submit', postJob);