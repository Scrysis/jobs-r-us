const express = require('express');
const router = express.Router();
const {Job, User, Application, Review} = require('../../models');
const {matchSorter} = require('match-sorter');

const jobList = async (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('#searchfield').value.trim();

    if(searchTerm){
        const response = await fetch('/api/jobs', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok && req.session.loggedIn) {
            return matchSorter(response, searchTerm, {keys: ['job_title']});
        } else if (!req.session.loggedIn) {
            document.location.replace('/login');
        }
    }


};

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

document
    .querySelector('#search')
    .addEventListener('submit', jobList);