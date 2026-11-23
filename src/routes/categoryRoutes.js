const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /v1/category/search:
 *   get:
 *     summary: Listar categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get('/search', CategoryController.search);

/**
 * @swagger
 * /v1/category/{id}:
 *   get:
 *     summary: Consultar categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/:id', CategoryController.show);

/**
 * @swagger
 * /v1/category:
 *   post:
 *     summary: Cadastrar categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Categoria cadastrada
 */
router.post('/', auth, CategoryController.store);

/**
 * @swagger
 * /v1/category/{id}:
 *   put:
 *     summary: Atualizar categoria
 *     tags: [Categorias]
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
 *         description: Categoria atualizada
 */
router.put('/:id', auth, CategoryController.update);

/**
 * @swagger
 * /v1/category/{id}:
 *   delete:
 *     summary: Excluir categoria
 *     tags: [Categorias]
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
 *         description: Categoria excluída
 */
router.delete('/:id', auth, CategoryController.delete);

module.exports = router;
