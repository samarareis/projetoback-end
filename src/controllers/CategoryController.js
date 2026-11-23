
const { Category } = require('../models');
const { Op } = require('sequelize');

class CategoryController {
  async search(req, res) {
    try {
      const { name } = req.query;

      const categories = await Category.findAll({
        where: name
          ? { name: { [Op.like]: `%${name}%` } }
          : {}
      });

      return res.json(categories);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async show(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({
          message: 'Categoria não encontrada'
        });
      }

      return res.json(category);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async store(req, res) {
    try {
      const { name, slug, use_in_menu } = req.body;

      const category = await Category.create({
        name,
        slug,
        use_in_menu
      });

      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({
          message: 'Categoria não encontrada'
        });
      }

      const { name, slug, use_in_menu } = req.body;

      await category.update({
        name,
        slug,
        use_in_menu
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({
          message: 'Categoria não encontrada'
        });
      }

      await category.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = new CategoryController();
