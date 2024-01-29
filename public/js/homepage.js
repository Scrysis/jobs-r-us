

const applyButton = async (req, res) => {
    const response = await fetch ('/dashboard', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    if(response.ok && req.session.loggedIn) {
        document.location.replace('/dashboard');
    }   else if (!req.session.loggedIn) {
        document.location.replace('/login')
    }
};

document
    .querySelector('#homepageApplyBtn')
    .addEventListener('click', applyButton);

//create post function

const postButton = (req, res) => {
     if(req.session.loggedIn) {
            document.location.replace('/api/jobs/create');
    }  else if (!req.session.loggedIn) {
            document.location.replace('/login')
    }
};

document
    .querySelector('#homepagePostBtn')
    .addEventListener('click', postButton);