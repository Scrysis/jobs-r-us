const User = require('./User');
const Job = require('./Job');
const Review = require('./Review');
const Application = require('./Application');

Review.belongsTo(User, {
    foreignKey: 'review_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});
Job.hasMany(Review, {
    foreignKey: 'review_id',
});

User.hasMany(Job, {
    as: 'job',
    foreignKey: 'job_Id',
});

User.belongsToMany(Job, {
    through: {
        model: Application,
    },
    as: 'job_entry',
});

Job.belongsToMany(User, {
    through: {
        model: Application,
    },
    as: 'job_applicant',
});

module.exports = {User, Job, Review, Application};



