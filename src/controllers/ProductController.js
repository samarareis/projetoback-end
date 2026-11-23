
const { Product, Category, ProductImage, ProductOption } = require('../models');
const { Op } = require('sequelize');

class ProductController {

  // LISTAR E PESQUISAR PRODUTOS
  async search(req, res) {
    try {
      const limit = Math.max(1, Number(req.query.limit) || 12);
      const page = Math.max(1, Number(req.query.page) || 1);
      const offset = (page - 1) * limit;
      const { match } = req.query;

      const where = {};

      if (match) {
        where[Op.or] = [
          { name: { [Op.like]: `%${match}%` } },
          { slug: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } }
        ];
      }

      const result = await Product.findAndCountAll({
        where,
        limit,
        offset,
        distinct: true,
        include: [
          {
            model: Category,
            as: 'categories',
            through: { attributes: [] }
          },
          {
            model: ProductImage,
            as: 'images'
          },
          {
            model: ProductOption,
            as: 'options'
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).json({
        total: result.count,
        limit,
        page,
        data: result.rows
      });

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // MOSTRAR UM PRODUTO
  async show(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: 'categories',
            through: { attributes: [] }
          },
          {
            model: ProductImage,
            as: 'images'
          },
          {
            model: ProductOption,
            as: 'options'
          }
        ]
      });

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        });
      }

      return res.status(200).json(product);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // CADASTRAR PRODUTO COM CATEGORIAS, IMAGENS E OPÇÕES
  async store(req, res) {
    let transaction;

    try {
      transaction = await Product.sequelize.transaction();

      const {
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount,
        category_ids,
        images,
        options
      } = req.body;

      const product = await Product.create({
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      }, { transaction });

      if (category_ids && category_ids.length > 0) {
        await product.setCategories(category_ids, { transaction });
      }

      if (images && images.length > 0) {
        await ProductImage.bulkCreate(
          images.map(image => ({
            product_id: product.id,
            enabled: image.enabled,
            path: image.path
          })),
          { transaction }
        );
      }

      if (options && options.length > 0) {
        await ProductOption.bulkCreate(
          options.map(option => ({
            product_id: product.id,
            title: option.title,
            shape: option.shape,
            radius: option.radius,
            type: option.type,
            values: option.values
          })),
          { transaction }
        );
      }

      await transaction.commit();

      const createdProduct = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: 'categories',
            through: { attributes: [] }
          },
          {
            model: ProductImage,
            as: 'images'
          },
          {
            model: ProductOption,
            as: 'options'
          }
        ]
      });

      return res.status(201).json(createdProduct);

    } catch (error) {
      if (transaction && !transaction.finished) {
        await transaction.rollback();
      }

      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ATUALIZAR PRODUTO
  async update(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        });
      }

      const {
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      } = req.body;

      await product.update({
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      });

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // EXCLUIR PRODUTO
  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        });
      }

      await product.destroy();

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

}

module.exports = new ProductController();
