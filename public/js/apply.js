const express = require('express');
const router = express.Router();
const { Job, User, Application, Review } = require('../../models');

router.post('/:id/application', async (req, res) => {
  try {
    const jobId = req.params.id;
    const { email, application_text } = req.body;

    // Check if the job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user has already applied for the job
    const userJob = await User.findOne({ where: { email, jobId } });
    if (userJob) {
      return res.status(409).json({ message: 'You have already applied for this job' });
    }

    // Create a new application
    const application = await Application.create({
      job_id: jobId,
      application_text: application_text,
      // Assuming you have a session with userId stored for the applicant
      applicant_id: req.session.userId,
    });

    // Return a success message
    return res.status(200).json({ message: 'Application submitted successfully', application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error submitting application' });
  }
});

module.exports = router;