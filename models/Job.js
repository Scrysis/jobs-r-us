const {Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Job extends Model {}

Job.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        job_title: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
        },
        requirements_text: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        description_text: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        salary: {
            type: Datatypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true,
                min: 0
            }
        },
        user_id: {
            type: Datatypes.INTEGER,
            references:{
                model: 'user',
                key: 'id',
                unique: false
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        createdAt: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'job'
    }
);

module.exports = Job;