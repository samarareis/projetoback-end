
const { ProductOption, Product } = require('../models');

class ProductOptionController {

  // CADASTRAR OPÇÃO
  async store(req, res) {
    try {
      const {
        product_id,
        title,
        shape,
        radius,
        type,
        values
      } = req.body;

      const product = await Product.findByPk(product_id);

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        });
      }

      const option = await ProductOption.create({
        product_id,
        title,
        shape,
        radius,
        type,
        values
      });

      return res.status(201).json(option);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // CONSULTAR OPÇÕES DE UM PRODUTO
  async show(req, res) {
    try {
      const options = await ProductOption.findAll({
        where: {
          product_id: req.params.product_id
        }
      });

      return res.json(options);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ATUALIZAR OPÇÃO
  async update(req, res) {
    try {
      const option = await ProductOption.findByPk(req.params.id);

      if (!option) {
        return res.status(404).json({
          message: 'Opção não encontrada'
        });
      }

      const {
        title,
        shape,
        radius,
        type,
        values
      } = req.body;

      await option.update({
        title,
        shape,
        radius,
        type,
        values
      });

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // EXCLUIR OPÇÃO
  async delete(req, res) {
    try {
      const option = await ProductOption.findByPk(req.params.id);

      if (!option) {
        return res.status(404).json({
          message: 'Opção não encontrada'
        });
      }

      await option.destroy();

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = new ProductOptionController();
