const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Job extends Model {}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        job_title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
        },
        requirements_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true,
                min: 0
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
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