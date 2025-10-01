const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Função para gerar JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expira em 24 horas
  );
};

// POST /api/auth/login - Login do usuário
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 1 }).withMessage('Senha é obrigatória'),
  body('role').isIn(['admin', 'juror']).withMessage('Papel inválido')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { email, password, role } = req.body;

    // Buscar usuário no banco
    const userResult = await query(
      'SELECT id, name, email, password_hash, role FROM users WHERE email = $1 AND role = $2',
      [email, role]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const user = userResult.rows[0];

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Gerar token
    const token = generateToken(user.id, user.role);

    // Retornar dados do usuário (sem a senha) e token
    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

    console.log(`✅ Login realizado: ${user.name} (${user.role})`);
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/auth/register - Registro de novo usuário (apenas admin pode criar)
router.post('/register', [
  body('name').isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('role').isIn(['admin', 'juror']).withMessage('Papel deve ser admin ou juror')
], authenticateToken, async (req, res) => {
  try {
    // Apenas admin pode criar novos usuários
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Apenas administradores podem criar usuários',
        code: 'ADMIN_REQUIRED'
      });
    }

    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { name, email, password, role } = req.body;

    // Verificar se email já existe
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: 'Email já está em uso',
        code: 'EMAIL_EXISTS'
      });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 12);

    // Criar novo usuário
    const newUserResult = await query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, passwordHash, role]
    );

    const newUser = newUserResult.rows[0];

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        created_at: newUser.created_at
      }
    });

    console.log(`✅ Usuário criado: ${newUser.name} (${newUser.role}) por ${req.user.name}`);
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/auth/me - Obter dados do usuário atual
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: req.user
    });
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/auth/refresh - Renovar token (opcional)
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    // Gerar novo token
    const newToken = generateToken(req.user.id, req.user.role);

    res.json({
      message: 'Token renovado com sucesso',
      token: newToken
    });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

module.exports = router;