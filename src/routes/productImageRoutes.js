const express = require('express');
const router = express.Router();

const ProductImageController = require('../controllers/ProductImageController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Imagens dos Produtos
 *   description: Gerenciamento de imagens dos produtos
 */

/**
 * @swagger
 * /v1/product-image/{product_id}:
 *   get:
 *     summary: Listar imagens de um produto
 *     tags: [Imagens dos Produtos]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Imagens encontradas
 */
router.get('/:product_id', ProductImageController.show);

/**
 * @swagger
 * /v1/product-image:
 *   post:
 *     summary: Cadastrar imagem de produto
 *     tags: [Imagens dos Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Imagem cadastrada
 */
router.post('/', auth, ProductImageController.store);

/**
 * @swagger
 * /v1/product-image/{id}:
 *   delete:
 *     summary: Excluir imagem de produto
 *     tags: [Imagens dos Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Imagem excluída
 */
router.delete('/:id', auth, ProductImageController.delete);

module.exports = router;
