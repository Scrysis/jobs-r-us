const {Application} = require('../models');

const applicationData = [
    {
        job_Id: 1,
        application_text: "Have a great enthusiam for dairy delivery.",
        applicant_Id: 2
    },
    {
        job_Id: 2,
        application_text: "I applied just to say screw you.",
        applicant_Id: 2
    },
    {
        job_Id: 3,
        application_text: "Have experience with a fire extinguisher",
        applicant_Id: 2
    },
    {
        job_Id: 4,
        application_text: "Masters in musical theory and have perfect rhythm",
        applicant_Id: 2
    },
    {
        job_Id: 5,
        application_text: "Have vanquished several dark lords in the past. Willing to do birthday parties.",
        applicant_Id: 2
    },
]

const seedApplications = () => Application.bulkCreate(applicationData);

module.exports = seedApplications;