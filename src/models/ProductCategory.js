
const { DataTypes } = require('sequelize');
const database = require('../config/database');

const ProductCategory = database.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  tableName: 'products_categories',
  timestamps: false,
  underscored: true
});

module.exports = ProductCategory;
