
const searchButton = document.getElementById("search");

/* const jobList = async (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('#searchfield').value.trim();

    if(searchTerm){
        const response = await fetch(`/search/${searchTerm}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        
    }


}; */

function jobList (){
    const searchTerm = document.querySelector('#searchfield').value.trim();
    window.location.href = '/search/'+ searchTerm;
}

/* router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbJobData = await Job.findAll();
        const jobs = dbJobData.map((job) =>
            job.get({ plain: true })
        );
        res.render('dashboard', {
            jobs,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.error('Error rendering dashboard:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); */
/* 
function searchCriteria(){
const searchbox = document.getElementById("searchfield");

if(searchbox){
    window.location.href = `/search/${searchbox}`;
}
} */



searchButton.addEventListener("click", jobList);