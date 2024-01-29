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

document
    .querySelector('#search')
    .addEventListener('click', jobList);