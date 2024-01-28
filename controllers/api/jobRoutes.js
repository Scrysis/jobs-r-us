const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { Application, Job, Review, User } = require("../../models");
const withAuth = require("../../utils/auth");
const { matchSorter } = require("match-sorter"); // import for the match-sorter package



// Routes needed:
//  Get all jobs
//  Get one job by id
//  Get Job Creation page
//  Create a new job
//  Update a job
//  Delete a job
//  Get jobs applicants
//  Get jobs reviews
//  Get Application page
//  Create application to a job
//  Get Review creation page
//  Create review for a job


//Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.findAll({});
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving jobs" });
  }
});

//Get a single job by ID
router.get("/:id", async (req, res) => {
  try {
    const jobData = await Job.findByk(req.params.id, {
      include: [{ model: Review, include: User }],
    });

    res.render("listing", {
      job: jobData.get({ plain: true }),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error("Error rendering job details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/create', (req, res) => {
  try {
    res.render('create', { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error('Error rendering job creation page:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Create a new job
router.post('/', async (req, res) => {
  try {
    const dbJobData = await Job.create({
      job_title: req.body.job_title,
      salary: req.body.salary,
      description_text: req.body.description_text,
      requirements_text: req.body.requirements_text
  }); res.status(200).json(dbJobData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating job' });
  }

});

//Update a job
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.update(req.body, {
      where: {id},
      returning: true,
    });
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      res.json(job);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating job', error: err });
  }
});


//Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Job.destroy({
      where: { id },
    });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job', error: err });
  }
});

// Get jobs applicants
router.get('/:id/applicants', async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobApplicants = await Application.findAll({
      where: { job_id: jobId },
      include: [{ model: User, as: 'job_entry' }],
    });

    res.json(jobApplicants);
  } catch (err) {
    console.error('Error retrieving job applicants:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get jobs reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobReviews = await Review.findAll({
      where: { job_id: jobId },
      include: [{ model: User }],
    });

    res.json(jobReviews);
  } catch (err) {
    console.error('Error retrieving job reviews:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get Application page
router.get("/:id/application", async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = await Job.findByPk(jobId, {
      include: [{ model: User, as: "job_applicant" }],
    });
    res.render("application", {
      job: jobData.get({ plain: true }),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error("Error rendering application:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create application for job
router.post('/:id/application', async (req, res) => {
  try {
    const jobId = req.params.id;
    const { application_text } = req.body;
    const applicantId = req.session.userId;

    const applicationData = await Application.create({
      job_id: jobId,
      application_text: application_text,
      applicant_id: applicantId,
    });

    res.status(200).json(applicationData);
  } catch (err) {
    console.error('Error creating job application:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Review creation page
router.get('/:id/reviews/create', async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = await Job.findByPk(jobId);

    res.render('createReview', {
      job: jobData.get({ plain: true }),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error('Error rendering review creation page:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create review for a job
router.post('/:id/reviews', async (req, res) => {
  try {
    const jobId = req.params.id;
    const { review_text } = req.body;
    const reviewerId = req.session.userId;

    const reviewData = await Review.create({
      job_id: jobId,
      review_text: review_text,
      user_id: reviewerId,
    });

    res.status(200).json(reviewData);
  } catch (err) {
    console.error('Error creating job review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

