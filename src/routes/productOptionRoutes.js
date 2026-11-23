const express = require('express');
const router = express.Router();

const ProductOptionController = require('../controllers/ProductOptionController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Opções dos Produtos
 *   description: Gerenciamento das opções dos produtos
 */

/**
 * @swagger
 * /v1/product-option/{product_id}:
 *   get:
 *     summary: Listar opções de um produto
 *     tags: [Opções dos Produtos]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Opções encontradas
 */
router.get('/:product_id', ProductOptionController.show);

/**
 * @swagger
 * /v1/product-option:
 *   post:
 *     summary: Cadastrar opção de produto
 *     tags: [Opções dos Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Opção cadastrada
 */
router.post('/', auth, ProductOptionController.store);

/**
 * @swagger
 * /v1/product-option/{id}:
 *   put:
 *     summary: Atualizar opção de produto
 *     tags: [Opções dos Produtos]
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
 *         description: Opção atualizada
 */
router.put('/:id', auth, ProductOptionController.update);

/**
 * @swagger
 * /v1/product-option/{id}:
 *   delete:
 *     summary: Excluir opção de produto
 *     tags: [Opções dos Produtos]
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
 *         description: Opção excluída
 */
router.delete('/:id', auth, ProductOptionController.delete);

module.exports = router;
