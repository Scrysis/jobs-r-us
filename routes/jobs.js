const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('job', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// GET /api/jobs - Retrieve all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await sequelize.model('Job').findAll({});
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving jobs' });
  }
});

// GET /api/jobs/:id - Retrieve a single job by ID
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await sequelize.model('Job').findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      res.json(job);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving job' });
  }
});