const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticateToken, requireJuror, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/votes/my - Obter votos do jurado logado
router.get('/my', authenticateToken, requireJuror, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        v.*,
        cp.name as cosplay_name,
        cp.character,
        cp.anime
      FROM votes v
      JOIN cosplay_profiles cp ON v.cosplay_id = cp.id
      WHERE v.juror_id = $1
      ORDER BY v.updated_at DESC
    `, [req.user.id]);

    res.json({
      votes: result.rows
    });
  } catch (error) {
    console.error('Erro ao obter votos do jurado:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/votes/profile/:profileId - Obter votos de um perfil específico (apenas admin)
router.get('/profile/:profileId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { profileId } = req.params;

    const result = await query(`
      SELECT 
        v.*,
        u.name as juror_name,
        u.email as juror_email
      FROM votes v
      JOIN users u ON v.juror_id = u.id
      WHERE v.cosplay_id = $1 AND v.submitted = true
      ORDER BY v.updated_at DESC
    `, [profileId]);

    res.json({
      votes: result.rows
    });
  } catch (error) {
    console.error('Erro ao obter votos do perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/votes - Criar ou atualizar voto
router.post('/', [
  body('cosplay_id').isInt({ min: 1 }).withMessage('ID do cosplay inválido'),
  body('indumentaria').isFloat({ min: 1, max: 10 }).withMessage('Nota de indumentária deve ser entre 1 e 10'),
  body('similaridade').isFloat({ min: 1, max: 10 }).withMessage('Nota de similaridade deve ser entre 1 e 10'),
  body('qualidade').isFloat({ min: 1, max: 10 }).withMessage('Nota de qualidade deve ser entre 1 e 10'),
  body('interpretacao').optional().isFloat({ min: 1, max: 10 }).withMessage('Nota de interpretação deve ser entre 1 e 10'),
  body('performance').optional().isFloat({ min: 1, max: 10 }).withMessage('Nota de performance deve ser entre 1 e 10'),
  body('submitted').isBoolean().withMessage('Status de submissão deve ser boolean')
], authenticateToken, requireJuror, async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { 
      cosplay_id, 
      indumentaria,
      similaridade,
      qualidade,
      interpretacao,
      performance,
      submitted 
    } = req.body;

    // Verificar se o perfil existe
    const profileResult = await query('SELECT id, name, character FROM cosplay_profiles WHERE id = $1', [cosplay_id]);
    if (profileResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Perfil de cosplay não encontrado',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const profile = profileResult.rows[0];

    // Verificar se já existe um voto deste jurado para este perfil
    const existingVote = await query(
      'SELECT id FROM votes WHERE juror_id = $1 AND cosplay_id = $2',
      [req.user.id, cosplay_id]
    );

    let result;
    let message;

    if (existingVote.rows.length > 0) {
      // Atualizar voto existente
      result = await query(`
        UPDATE votes 
        SET 
          indumentaria = $1,
          similaridade = $2,
          qualidade = $3,
          interpretacao = $4,
          performance = $5,
          submitted = $6,
          updated_at = CURRENT_TIMESTAMP
        WHERE juror_id = $7 AND cosplay_id = $8
        RETURNING *
      `, [indumentaria, similaridade, qualidade, interpretacao || null, performance || null, submitted, req.user.id, cosplay_id]);
      
      message = 'Voto atualizado com sucesso';
      console.log(`✅ Voto atualizado: ${req.user.name} para ${profile.name} - ${profile.character}`);
    } else {
      // Criar novo voto
      result = await query(`
        INSERT INTO votes (juror_id, cosplay_id, indumentaria, similaridade, qualidade, interpretacao, performance, submitted)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `, [req.user.id, cosplay_id, indumentaria, similaridade, qualidade, interpretacao || null, performance || null, submitted]);
      
      message = 'Voto criado com sucesso';
      console.log(`✅ Novo voto: ${req.user.name} para ${profile.name} - ${profile.character}`);
    }

    const vote = result.rows[0];

    res.json({
      message,
      vote: {
        ...vote,
        cosplay_name: profile.name,
        cosplay_character: profile.character
      }
    });
  } catch (error) {
    console.error('Erro ao salvar voto:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/votes/check/:profileId - Verificar se jurado já votou em um perfil
router.get('/check/:profileId', authenticateToken, requireJuror, async (req, res) => {
  try {
    const { profileId } = req.params;

    const result = await query(
      'SELECT * FROM votes WHERE juror_id = $1 AND cosplay_id = $2',
      [req.user.id, profileId]
    );

    const hasVoted = result.rows.length > 0;
    const vote = hasVoted ? result.rows[0] : null;

    res.json({
      has_voted: hasVoted,
      vote: vote
    });
  } catch (error) {
    console.error('Erro ao verificar voto:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// DELETE /api/votes/:profileId - Excluir voto (apenas o próprio jurado)
router.delete('/:profileId', authenticateToken, requireJuror, async (req, res) => {
  try {
    const { profileId } = req.params;

    // Verificar se o voto existe
    const existingVote = await query(
      'SELECT id FROM votes WHERE juror_id = $1 AND cosplay_id = $2',
      [req.user.id, profileId]
    );

    if (existingVote.rows.length === 0) {
      return res.status(404).json({
        error: 'Voto não encontrado',
        code: 'VOTE_NOT_FOUND'
      });
    }

    // Excluir voto
    await query(
      'DELETE FROM votes WHERE juror_id = $1 AND cosplay_id = $2',
      [req.user.id, profileId]
    );

    res.json({
      message: 'Voto excluído com sucesso'
    });

    console.log(`✅ Voto excluído: ${req.user.name} para perfil ${profileId}`);
  } catch (error) {
    console.error('Erro ao excluir voto:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/votes/statistics - Obter estatísticas gerais (apenas admin)
router.get('/statistics', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Total de votos submetidos
    const totalVotesResult = await query('SELECT COUNT(*) as total FROM votes WHERE submitted = true');
    const totalVotes = parseInt(totalVotesResult.rows[0].total);

    // Total de jurados que votaram
    const activeJurorsResult = await query('SELECT COUNT(DISTINCT juror_id) as total FROM votes WHERE submitted = true');
    const activeJurors = parseInt(activeJurorsResult.rows[0].total);

    // Total de perfis com votos
    const profilesWithVotesResult = await query('SELECT COUNT(DISTINCT cosplay_id) as total FROM votes WHERE submitted = true');
    const profilesWithVotes = parseInt(profilesWithVotesResult.rows[0].total);

    // Média geral por critério
    const averagesResult = await query(`
      SELECT 
        AVG(craftsmanship) as avg_craftsmanship,
        AVG(accuracy) as avg_accuracy,
        AVG(creativity) as avg_creativity,
        AVG(presentation) as avg_presentation,
        AVG(overall_impression) as avg_overall
      FROM votes 
      WHERE submitted = true
    `);

    const averages = averagesResult.rows[0] || {};

    // Top 3 perfis mais votados
    const topProfilesResult = await query(`
      SELECT 
        cp.id,
        cp.name,
        cp.character,
        cp.anime,
        COUNT(v.id) as vote_count,
        AVG((v.craftsmanship + v.accuracy + v.creativity + v.presentation + v.overall_impression) / 5.0) as avg_score
      FROM cosplay_profiles cp
      LEFT JOIN votes v ON cp.id = v.cosplay_id AND v.submitted = true
      GROUP BY cp.id, cp.name, cp.character, cp.anime
      HAVING COUNT(v.id) > 0
      ORDER BY avg_score DESC, vote_count DESC
      LIMIT 3
    `);

    // Contar jurados online (atividade nos últimos 5 minutos)
    const onlineJurorsResult = await query(`
      SELECT COUNT(*) as total 
      FROM users 
      WHERE role = 'juror' 
      AND last_activity > NOW() - INTERVAL '5 minutes'
    `);
    const onlineJurors = parseInt(onlineJurorsResult.rows[0].total);

    res.json({
      total_votes: totalVotes,
      active_jurors: activeJurors,
      online_jurors: onlineJurors,
      profiles_with_votes: profilesWithVotes,
      averages: {
        craftsmanship: parseFloat(averages.avg_craftsmanship || 0).toFixed(2),
        accuracy: parseFloat(averages.avg_accuracy || 0).toFixed(2),
        creativity: parseFloat(averages.avg_creativity || 0).toFixed(2),
        presentation: parseFloat(averages.avg_presentation || 0).toFixed(2),
        overall_impression: parseFloat(averages.avg_overall || 0).toFixed(2)
      },
      top_profiles: topProfilesResult.rows.map(profile => ({
        ...profile,
        avg_score: parseFloat(profile.avg_score || 0).toFixed(2)
      }))
    });
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/votes/averages/:profileId - Obter médias de um perfil específico (público, para espectadores)
router.get('/averages/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;

    // Verificar se o perfil existe e pegar a modalidade
    const profileResult = await query(
      'SELECT id, name, character, modality FROM cosplay_profiles WHERE id = $1',
      [profileId]
    );

    if (profileResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Perfil não encontrado',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const profile = profileResult.rows[0];
    const modality = profile.modality || 'desfile';

    // Calcular médias baseado na modalidade
    let averagesResult;
    if (modality === 'presentation') {
      // Para apresentação: calcular média de 5 critérios
      averagesResult = await query(`
        SELECT 
          COUNT(*) as total_votes,
          COALESCE(AVG(indumentaria), 0) as avg_indumentaria,
          COALESCE(AVG(similaridade), 0) as avg_similaridade,
          COALESCE(AVG(qualidade), 0) as avg_qualidade,
          COALESCE(AVG(interpretacao), 0) as avg_interpretacao,
          COALESCE(AVG(performance), 0) as avg_performance,
          COALESCE(AVG((indumentaria + similaridade + qualidade + 
                       COALESCE(interpretacao, 0) + COALESCE(performance, 0)) / 5.0), 0) as final_average
        FROM votes 
        WHERE cosplay_id = $1 AND submitted = true
      `, [profileId]);
    } else {
      // Para desfile: calcular média de 3 critérios
      averagesResult = await query(`
        SELECT 
          COUNT(*) as total_votes,
          COALESCE(AVG(indumentaria), 0) as avg_indumentaria,
          COALESCE(AVG(similaridade), 0) as avg_similaridade,
          COALESCE(AVG(qualidade), 0) as avg_qualidade,
          COALESCE(AVG((indumentaria + similaridade + qualidade) / 3.0), 0) as final_average
        FROM votes 
        WHERE cosplay_id = $1 AND submitted = true
      `, [profileId]);
    }

    const result = averagesResult.rows[0];

    const response = {
      indumentaria: parseFloat(result.avg_indumentaria || 0),
      similaridade: parseFloat(result.avg_similaridade || 0),
      qualidade: parseFloat(result.avg_qualidade || 0),
      finalAverage: parseFloat(result.final_average || 0),
      totalVotes: parseInt(result.total_votes || 0)
    };

    // Adicionar interpretacao e performance se for modalidade apresentação
    if (modality === 'presentation') {
      response.interpretacao = parseFloat(result.avg_interpretacao || 0);
      response.performance = parseFloat(result.avg_performance || 0);
    }

    res.json(response);
  } catch (error) {
    console.error('Erro ao calcular médias do perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

module.exports = router;