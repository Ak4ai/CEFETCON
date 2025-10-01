const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

// Middleware para verificar autenticação JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acesso requerido',
        code: 'NO_TOKEN' 
      });
    }

    // Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuário no banco para verificar se ainda existe
    const userResult = await query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ 
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND' 
      });
    }

    // Adicionar informações do usuário ao request
    req.user = userResult.rows[0];
    
    // Atualizar last_activity do usuário (sem await para não bloquear)
    query('UPDATE users SET last_activity = NOW() WHERE id = $1', [decoded.userId])
      .catch(err => console.error('Erro ao atualizar last_activity:', err));
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Token inválido',
        code: 'INVALID_TOKEN' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expirado',
        code: 'EXPIRED_TOKEN' 
      });
    }
    
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR' 
    });
  }
};

// Middleware para verificar papel específico
const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Usuário não autenticado',
        code: 'NOT_AUTHENTICATED' 
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        error: `Acesso negado. Requer papel: ${requiredRole}`,
        code: 'INSUFFICIENT_PERMISSIONS' 
      });
    }

    next();
  };
};

// Middleware para verificar se é admin
const requireAdmin = requireRole('admin');

// Middleware para verificar se é jurado
const requireJuror = requireRole('juror');

module.exports = {
  authenticateToken,
  requireRole,
  requireAdmin,
  requireJuror
};