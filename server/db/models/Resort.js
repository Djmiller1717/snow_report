const Sequelize = require('sequelize');
const db = require('../db');

const { STRING, FLOAT, ARRAY } = Sequelize;

const Resort = db.define('resort', {
  resortName: {
    type: STRING,
    allowNull: false,
  },
  location: {
    type: ARRAY(FLOAT),
    defaultValue: [],
  },
  state: {
    type: STRING,
  },
});
module.exports = Resort;
