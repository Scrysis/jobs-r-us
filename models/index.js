const User = require('./User');
const Job = require('./Job');
const Review = require('./Review');
const Application = require('./Application');

Review.belongsToOne(User, {
    foreignKey: 'review_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});
Job.hasMany(Review, {
    foreignKey: 'review_id',
});
/* Work on below */
User.hasMany(Job, {
    as: 'job',
    foreignKey: 'job_Id'
});
Job.belongsTo(User, {
    as: ''
})
