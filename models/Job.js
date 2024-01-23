const {Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');
import { matchSorter } from 'match-sorter';

class Job extends Model {
    
}

Job.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        requirements_text: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        description_text: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: Datatypes.INTEGER,
            references:{
                model: 'user',
                key: 'id',
                unique: false
            }
        }
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