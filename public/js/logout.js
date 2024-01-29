const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'}, 
    });
    console.log("LOOK HERE",response)
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Could not logout. Please try again later');
    }
};

document
    .querySelector('#logout')
    .addEventListener('click', logout);