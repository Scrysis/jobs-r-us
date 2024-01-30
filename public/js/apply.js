const applyJob = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#applicationFirstName').value
  const last_name = document.querySelector('#applicationLastName').value
  const email = document.querySelector('#applicationEmail').value
  const application_text = document.querySelector('#applicationExperience').value
 

  if(first_name && last_name && email && application_text) {
      const response = await fetch(`/api/jobs/:id/application`, {
          method: 'POST',
          body: JSON.stringify({first_name, last_name, email, application_text}),
          headers: { 'Content-Type': 'application/json' }
      });
      if(response.ok) {
          alert('Submitted!')
          document.location.replace('/dashboard')
      } else {
          alert('Could not submit. Please try again');
      }
  } 
};


document
  .querySelector('#application-form')
  .addEventListener('submit', applyJob);my