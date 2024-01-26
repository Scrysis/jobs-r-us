const router = require('express').Router();


const dashRoutes = require('./dashboardRoutes');

router.use('/', dashRoutes);


module.exports = router;
