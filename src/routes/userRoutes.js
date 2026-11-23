
const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /v1/user:
 *   post:
 *     summary: Cadastrar usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - surname
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Maria
 *               surname:
 *                 type: string
 *                 example: Silva
 *               email:
 *                 type: string
 *                 example: maria.teste2026@example.com
 *               password:
 *                 type: string
 *                 example: SenhaTeste123
 *               confirmPassword:
 *                 type: string
 *                 example: SenhaTeste123
 *     responses:
 *       201:
 *         description: Usuário cadastrado
 *       400:
 *         description: Senhas não conferem
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/', UserController.store);

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', UserController.show);

/**
 * @swagger
 * /v1/user/token:
 *   post:
 *     summary: Gerar token de acesso
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria.teste2026@example.com
 *               password:
 *                 type: string
 *                 example: SenhaTeste123
 *     responses:
 *       200:
 *         description: Token gerado
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/token', UserController.generateToken);

/**
 * @swagger
 * /v1/user/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       204:
 *         description: Usuário atualizado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', auth, UserController.update);

/**
 * @swagger
 * /v1/user/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     tags: [Usuários]
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
 *         description: Usuário excluído
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', auth, UserController.delete);

module.exports = router;
