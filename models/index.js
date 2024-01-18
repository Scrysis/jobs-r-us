const User = require('./User');
const Job = require('./Job');
const Review = require('./Review');

Review.belongsToOne(User, {
    foreignKey: 'review_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});
Job.hasMany(Review, {
    foreignKey: 'review_id',
});
