const router = require('express').Router();
const { User, Review, Job, Application} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const jobData = await Job.findAll({
            include: [
                {
                    model: User,
                    attributes: ['first_name'],
                },
            ],
        });

        const jobs = jobData.map((job) => job.get({ plain: true}));

        res.render('homepage', {
            jobs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/jobs/:id', async (req) => {
    try {
        const jobData = await Job.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['first_name'],
                },
            ],
        });
        const job = jobData.get({ plain: true});

        res.render('job', {
            ...job,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});