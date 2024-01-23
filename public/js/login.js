const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#useLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Could not login to account. Please try again');
        }
    }
};

const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#userSignup').value.trim();
    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Could not create account. Please try later')
        }

        if (username) 
    }
};
// Add code for user already created/pick new username??

document
    .querySelector('.loginForm')
    .addEventListener('submit', loginForm);

document
  .querySelector('.signupForm')
  .addEventListener('submit', signupForm);