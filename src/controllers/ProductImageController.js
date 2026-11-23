
const { ProductImage, Product } = require('../models');

class ProductImageController {

  // CADASTRAR IMAGEM
  async store(req, res) {
    try {
      const { product_id, enabled, path } = req.body;

      const product = await Product.findByPk(product_id);

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        });
      }

      const image = await ProductImage.create({
        product_id,
        enabled,
        path
      });

      return res.status(201).json(image);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // CONSULTAR IMAGENS DE UM PRODUTO
  async show(req, res) {
    try {
      const images = await ProductImage.findAll({
        where: {
          product_id: req.params.product_id
        }
      });

      return res.json(images);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // EXCLUIR IMAGEM
  async delete(req, res) {
    try {
      const image = await ProductImage.findByPk(req.params.id);

      if (!image) {
        return res.status(404).json({
          message: 'Imagem não encontrada'
        });
      }

      await image.destroy();

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = new ProductImageController();
