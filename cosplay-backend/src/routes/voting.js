const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/voting/current - Obter perfil atualmente visível para votação
router.get('/current', authenticateToken, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        cp.*,
        u.name as created_by_name
      FROM voting_control vc
      LEFT JOIN cosplay_profiles cp ON vc.current_visible_profile_id = cp.id
      LEFT JOIN users u ON cp.created_by = u.id
      ORDER BY vc.id DESC
      LIMIT 1
    `);

    if (result.rows.length === 0 || !result.rows[0].id) {
      return res.json({
        current_profile: null,
        message: 'Nenhum perfil selecionado para votação'
      });
    }

    const profile = result.rows[0];

    // Se for jurado, verificar se já votou neste perfil
    let user_vote = null;
    if (req.user.role === 'juror') {
      const voteResult = await query(
        'SELECT * FROM votes WHERE juror_id = $1 AND cosplay_id = $2',
        [req.user.id, profile.id]
      );
      user_vote = voteResult.rows[0] || null;
    }

    res.json({
      current_profile: profile,
      user_vote
    });
  } catch (error) {
    console.error('Erro ao obter perfil atual:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/voting/current-public - Obter perfil atualmente visível (acesso público para espectadores)
router.get('/current-public', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        cp.*,
        u.name as created_by_name
      FROM voting_control vc
      LEFT JOIN cosplay_profiles cp ON vc.current_visible_profile_id = cp.id
      LEFT JOIN users u ON cp.created_by = u.id
      ORDER BY vc.id DESC
      LIMIT 1
    `);

    if (result.rows.length === 0 || !result.rows[0].id) {
      return res.json({
        current_profile: null,
        message: 'Nenhum perfil selecionado para votação'
      });
    }

    const profile = result.rows[0];
    res.json({
      current_profile: profile
    });
  } catch (error) {
    console.error('Erro ao obter perfil atual público:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/voting/set-visible/:profileId - Definir perfil visível (apenas admin)
router.put('/set-visible/:profileId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { profileId } = req.params;

    // 1. Obter o perfil que está visível AGORA (antes da troca)
    const currentVisibleResult = await query(`
      SELECT current_visible_profile_id FROM voting_control ORDER BY id DESC LIMIT 1
    `);
    const oldVisibleProfileId = currentVisibleResult.rows[0]?.current_visible_profile_id;

    // 2. Se existia um perfil visível, calcular e salvar seus resultados finais
    if (oldVisibleProfileId) {
      console.log(`🔄 Fechando votação para o perfil ID: ${oldVisibleProfileId}`);
      const finalStatsResult = await query(`
        SELECT 
          COUNT(*) FILTER (WHERE submitted = true) as total_votes,
          AVG((indumentaria + similaridade + qualidade) / 3.0) as overall_average
        FROM votes 
        WHERE cosplay_id = $1 AND submitted = true
      `, [oldVisibleProfileId]);

      const finalStats = finalStatsResult.rows[0];
      const finalScore = parseFloat(finalStats.overall_average || 0);
      const totalVotes = parseInt(finalStats.total_votes || 0);

      // Atualizar o perfil antigo com os resultados e marcar como 'completed'
      await query(`
        UPDATE cosplay_profiles
        SET 
          voting_status = 'completed',
          final_score = $1,
          total_final_votes = $2,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [finalScore, totalVotes, oldVisibleProfileId]);
      console.log(`✅ Resultados finais salvos para o perfil ID: ${oldVisibleProfileId}. Nota: ${finalScore}, Votos: ${totalVotes}`);
    }

    // Verificar se o perfil existe (null é válido para remover visibilidade)
    if (profileId && profileId !== 'null') {
      const profileResult = await query('SELECT id, name, character FROM cosplay_profiles WHERE id = $1', [profileId]);
      if (profileResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Perfil não encontrado',
          code: 'PROFILE_NOT_FOUND'
        });
      }
    }

    const visibleProfileId = (profileId === 'null' || !profileId) ? null : profileId;

    // 3. Atualizar o controle de votação para o NOVO perfil
    const result = await query(`
      UPDATE voting_control 
      SET current_visible_profile_id = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM voting_control ORDER BY id DESC LIMIT 1)
      RETURNING *
    `, [visibleProfileId]);

    if (result.rows.length === 0) {
      // Se não existe registro, criar um
      await query(`
        INSERT INTO voting_control (current_visible_profile_id)
        VALUES ($1)
      `, [visibleProfileId]);
    }

    // 4. Se um novo perfil foi definido, marcar seu status como 'active'
    if (visibleProfileId) {
      await query(`
        UPDATE cosplay_profiles
        SET voting_status = 'active', updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
      `, [visibleProfileId]);
    }

    // Buscar perfil atualizado
    let currentProfile = null;
    if (visibleProfileId) {
      const profileResult = await query(`
        SELECT 
          cp.*,
          u.name as created_by_name
        FROM cosplay_profiles cp
        LEFT JOIN users u ON cp.created_by = u.id
        WHERE cp.id = $1
      `, [visibleProfileId]);
      currentProfile = profileResult.rows[0] || null;
    }

    const message = visibleProfileId 
      ? `Perfil ${currentProfile?.name} - ${currentProfile?.character} agora está visível para votação`
      : 'Nenhum perfil está visível para votação';

    res.json({
      message,
      current_profile: currentProfile
    });

    console.log(`✅ Visibilidade alterada por ${req.user.name}: ${message}`);
  } catch (error) {
    console.error('Erro ao definir perfil visível:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/voting/status - Obter status geral da votação (apenas admin)
router.get('/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Perfil atual
    const currentResult = await query(`
      SELECT 
        cp.id,
        cp.name,
        cp.character,
        cp.anime
      FROM voting_control vc
      LEFT JOIN cosplay_profiles cp ON vc.current_visible_profile_id = cp.id
      ORDER BY vc.id DESC
      LIMIT 1
    `);

    const currentProfile = currentResult.rows[0] || null;

    // Estatísticas de votação do perfil atual
    let currentProfileStats = null;
    if (currentProfile && currentProfile.id) {
      const statsResult = await query(`
        SELECT 
          COUNT(*) FILTER (WHERE submitted = true) as total_votes,
          COUNT(DISTINCT juror_id) as unique_jurors,
          AVG(indumentaria) as avg_indumentaria,
          AVG(similaridade) as avg_similaridade,
          AVG(qualidade) as avg_qualidade
        FROM votes 
        WHERE cosplay_id = $1
      `, [currentProfile.id]);

      const stats = statsResult.rows[0];
      currentProfileStats = {
        total_votes: parseInt(stats.total_votes || 0),
        unique_jurors: parseInt(stats.unique_jurors || 0),
        averages: {
          indumentaria: parseFloat(stats.avg_indumentaria || 0).toFixed(2),
          similaridade: parseFloat(stats.avg_similaridade || 0).toFixed(2),
          qualidade: parseFloat(stats.avg_qualidade || 0).toFixed(2)
        }
      };
    }

    // Total de jurados cadastrados
    const jurorsResult = await query('SELECT COUNT(*) as total FROM users WHERE role = $1', ['juror']);
    const totalJurors = parseInt(jurorsResult.rows[0].total);

    // Jurados online (que deram ping nos últimos 10 segundos)
    const onlineJurorsResult = await query(`
      SELECT COUNT(*) as total FROM juror_activity WHERE last_seen > NOW() - INTERVAL '10 seconds'
    `);
    const onlineJurors = parseInt(onlineJurorsResult.rows[0].total);

    // Jurados que ainda não votaram no perfil atual
    let pendingJurors = [];
    if (currentProfile && currentProfile.id) {
      const pendingResult = await query(`
        SELECT u.id, u.name, u.email
        FROM users u
        WHERE u.role = 'juror'
        AND u.id NOT IN (
          SELECT DISTINCT juror_id 
          FROM votes 
          WHERE cosplay_id = $1 AND submitted = true
        )
        ORDER BY u.name
      `, [currentProfile.id]);
      pendingJurors = pendingResult.rows;
    }

    // Buscar todos os votos (rascunhos e submetidos) para o perfil atual
    let currentProfileVotes = [];
    if (currentProfile && currentProfile.id) {
      const votesResult = await query(`
        SELECT 
          v.*,
          u.name as juror_name
        FROM votes v
        JOIN users u ON v.juror_id = u.id
        WHERE v.cosplay_id = $1
        ORDER BY v.updated_at DESC
      `, [currentProfile.id]);
      currentProfileVotes = votesResult.rows;
    }

    res.json({
      current_profile: currentProfile,
      current_profile_stats: currentProfileStats,
      total_jurors: totalJurors,
      online_jurors: onlineJurors,
      pending_jurors: pendingJurors,
      voting_active: !!(currentProfile && currentProfile.id),
      current_profile_votes: currentProfileVotes
    });
  } catch (error) {
    console.error('Erro ao obter status da votação:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/voting/close - Fechar votação atual (apenas admin)
router.post('/close', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Obter perfil atual antes de fechar
    const currentResult = await query(`
      SELECT 
        cp.id,
        cp.name,
        cp.character
      FROM voting_control vc
      LEFT JOIN cosplay_profiles cp ON vc.current_visible_profile_id = cp.id
      ORDER BY vc.id DESC
      LIMIT 1
    `);

    const currentProfile = currentResult.rows[0];

    if (!currentProfile || !currentProfile.id) {
      return res.status(400).json({
        error: 'Nenhuma votação ativa para fechar',
        code: 'NO_ACTIVE_VOTING'
      });
    }

    // Fechar votação (remover visibilidade)
    await query(`
      UPDATE voting_control 
      SET current_visible_profile_id = NULL, updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM voting_control ORDER BY id DESC LIMIT 1)
    `);

    // Obter estatísticas finais
    const finalStatsResult = await query(`
      SELECT 
        COUNT(*) as total_votes,
        COUNT(DISTINCT juror_id) as unique_jurors,
        AVG((indumentaria + similaridade + qualidade) / 3.0) as overall_average
      FROM votes 
      WHERE cosplay_id = $1 AND submitted = true
    `, [currentProfile.id]);

    const finalStats = finalStatsResult.rows[0];

    res.json({
      message: `Votação fechada para ${currentProfile.name} - ${currentProfile.character}`,
      final_stats: {
        profile: currentProfile,
        total_votes: parseInt(finalStats.total_votes || 0),
        unique_jurors: parseInt(finalStats.unique_jurors || 0),
        overall_average: parseFloat(finalStats.overall_average || 0).toFixed(2)
      }
    });

    console.log(`✅ Votação fechada por ${req.user.name}: ${currentProfile.name} - ${currentProfile.character}`);
  } catch (error) {
    console.error('Erro ao fechar votação:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

module.exports = router;