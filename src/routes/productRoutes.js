
const express = require('express');
const router = express.Router();


const ProductController = require('../controllers/ProductController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /v1/product/search:
 *   get:
 *     summary: Listar produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/search', ProductController.search);

/**
 * @swagger
 * /v1/product/{id}:
 *   get:
 *     summary: Consultar produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', ProductController.show);

/**
 * @swagger
 * /v1/product:
 *   post:
 *     summary: Cadastrar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Produto cadastrado
 */
router.post('/', auth, ProductController.store);
/**

 * @swagger
 * /v1/product:
 *   post:
 *     summary: Cadastrar produto com categorias, imagens e opções
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - enabled
 *               - name
 *               - slug
 *               - use_in_menu
 *               - stock
 *               - description
 *               - price
 *               - price_with_discount
 *             properties:
 *               enabled:
 *                 type: boolean
 *                 example: true
 *               name:
 *                 type: string
 *                 example: Body Infantil Teste
 *               slug:
 *                 type: string
 *                 example: body-infantil-teste
 *               use_in_menu:
 *                 type: boolean
 *                 example: true
 *               stock:
 *                 type: integer
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: Body infantil personalizado
 *               price:
 *                 type: number
 *                 example: 39.90
 *               price_with_discount:
 *                 type: number
 *                 example: 34.90
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     enabled:
 *                       type: boolean
 *                       example: true
 *                     path:
 *                       type: string
 *                       example: body-infantil-teste.jpg
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: Tamanho
 *                     shape:
 *                       type: string
 *                       example: square
 *                     radius:
 *                       type: integer
 *                       example: 0
 *                     type:
 *                       type: string
 *                       example: text
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [P, M, G]
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

 
router.put('/:id', auth, ProductController.update);

/**
 * @swagger
 * /v1/product/{id}:
 *   delete:
 *     summary: Excluir produto
 *     tags: [Produtos]
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
 *         description: Produto excluído
 */
router.delete('/:id', auth, ProductController.delete);

module.exports = router;
