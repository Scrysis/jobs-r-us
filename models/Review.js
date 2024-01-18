const { Model, Datatypes } = require("sequelize");
const sequelize = require("./config/connection");

class Review extends Model {}

Review.init(
  {
    id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    review_text: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    review_rating: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
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
