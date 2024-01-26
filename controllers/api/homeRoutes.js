const router = require('express').Router();
const { Application, Job, Review } = require.apply('../models');

router.get('/', async (req, res) => {
    try {
        const dbApplicationData = await Job.findAll({
            include: [
                {
                    model: Job,
                    attributes: ['application_text'],
                },
            ],
        });

        const application = dbApplicationData.map((application) =>
            Job.get({ plain: true })
        );
        res.render('dashboard', {
            application,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/application/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const dbApplicationData = await Job.findbyPk(req.params.id, {
                include: [
                    {
                        model: Job,
                        attributes: [
                            'id',
                            'job_title',
                            'requirements_text',
                            'description_text',
                            'salary',
                        ],
                    },
                ],
            });
            const job = dbApplicationData.get({ plain: true });
            res.render('job', { job, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});




module.exports = router;