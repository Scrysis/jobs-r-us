const router = require('express').Router();
const { User, Application, Job, Review } = require('../models');
const withAuth = require('../utils/auth');

//Routes needed:
//  homepage route
//  dashboard route
//  login/signup page route
//  profile route



//brings user to homepage
router.get('/', (req, res) => {
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.error('Error rendering homepage:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//fetches job data brings user to dashboard
router.get('/dashboard', async (req, res) => {
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
});

//brings user to login/signup page
router.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        console.error('Error rendering login page:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  //fetches logged in user data alongside posted jobs, reviews made, and applications made and sends to user profile page
  router.get('/profile', async (req, res) => {
    try {
        //fetch user data based on the logged-in user
        const userData = await User.findByPk(req.session.user_id, {
            //includes posted jobs, applied jobs, and posted reviews
            include: [{ model: Job, as: 'job_entry' }, { model: Review }, {model: Application}],
        });

        res.render('profile', {
            user: userData.get({ plain: true }),
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.error('Error rendering user profile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;