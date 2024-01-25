const { Model, Datatypes } = require("sequelize");
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review_text: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    review_rating: {
      type: Datatypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
    user_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    job_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "review",
  }
);

module.exports = Review;
