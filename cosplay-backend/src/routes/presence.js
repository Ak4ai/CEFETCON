const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, requireJuror } = require('../middleware/auth');

const router = express.Router();

// POST /api/presence/ping - Jurado informa que está ativo
router.post('/ping', authenticateToken, requireJuror, async (req, res) => {
  try {
    const jurorId = req.user.id;

    await query(`
      INSERT INTO juror_activity (juror_id, last_seen)
      VALUES ($1, NOW())
      ON CONFLICT (juror_id) 
      DO UPDATE SET last_seen = NOW();
    `, [jurorId]);

    res.status(200).json({ message: 'Ping recebido' });
  } catch (error) {
    console.error('Erro ao registrar ping do jurado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;