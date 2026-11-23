
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async store(req, res) {
    try {
      const {
        firstname,
        surname,
        email,
        password,
        confirmPassword
      } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: 'As senhas não conferem'
        });
      }

      const existingUser = await User.findOne({
        where: { email }
      });

      if (existingUser) {
        return res.status(409).json({
          message: 'E-mail já cadastrado'
        });
      }

      const user = await User.create({
        firstname,
        surname,
        email,
        password
      });

      return res.status(201).json({
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      const {
        firstname,
        surname,
        email,
        password,
        confirmPassword
      } = req.body;

      if (password && password !== confirmPassword) {
        return res.status(400).json({
          message: 'As senhas não conferem'
        });
      }

      await user.update({
        firstname,
        surname,
        email,
        ...(password
          ? { password: await bcrypt.hash(password, 10) }
          : {})
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
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async generateToken(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email }
      });

      if (
        !user ||
        !(await bcrypt.compare(password, user.password))
      ) {
        return res.status(401).json({
          message: 'E-mail ou senha inválidos'
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = new UserController();
