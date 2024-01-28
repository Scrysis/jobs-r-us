const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const {Application, Job, Review, User} = require('../../models');
const withAuth = require("../../utils/auth");

// Routes needed:
//  Get all users
//  Get one user by id
//  Create a new user
//  Update a user
//  Delete a user
//  Login Route
//  Logout Route
//  Get users job listings
//  Get users applications
//  Get users reviews

// Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
});

// Retrieve a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Update a user
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.update(req.body, {
      where: {id},
      returning: true,
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({
      where: { id },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(
        'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//  Get users job listings

router.get('/:id/listings', async (req, res) => {
  try {
    const userId = req.params.id;
    const userJobListings = await Job.findAll({
      where: { user_id: userId },
    });

    res.json(userJobListings);
  } catch (err) {
    console.error("Error retrieving job listings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get users applications
router.get('/:id/applications', async (req, res) => {
  try {
    const userId = req.params.id;
    const userApplications = await Application.findAll({
      where: { applicant_id: userId },
    });

    res.json(userApplications);
  } catch (err) {
    console.error("Error retrieving applications:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get users reviews

router.get('/:id/reviews', async (req, res) => {
  try {
    const userId = req.params.id;
    const userReviews = await Review.findAll({
      where: { user_id: userId },
    });

    res.json(userReviews);
  } catch (err) {
    console.error("Error retrieving reviews:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
