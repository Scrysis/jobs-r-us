const { Model, Datatypes } = require("sequelize");
const sequelize = require('../config/connection');

class Application extends Model {}

Application.init(
  {
    id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_Id: {
      type: Datatypes.INTEGER,
      references: {
        model: 'job',
        key: 'id',
      },
    },
    application_text: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    applicant_Id: {
      type: Datatypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "application",
  }
);

module.exports = Application;
