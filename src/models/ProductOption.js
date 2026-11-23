
const { DataTypes } = require('sequelize');
const database = require('../config/database');

const ProductOption = database.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    defaultValue: 'square'
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    defaultValue: 'text'
  },
  values: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'product_options',
  timestamps: false,
  underscored: true
});

module.exports = ProductOption;
