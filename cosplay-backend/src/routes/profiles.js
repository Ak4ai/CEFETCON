const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/profiles - Listar todos os perfis
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        cp.*,
        u.name as created_by_name,
        (SELECT COUNT(*) FROM votes v WHERE v.cosplay_id = cp.id AND v.submitted = true) as vote_count
      FROM cosplay_profiles cp
      LEFT JOIN users u ON cp.created_by = u.id
      ORDER BY cp.created_at DESC
    `);

    res.json({
      profiles: result.rows
    });
  } catch (error) {
    console.error('Erro ao listar perfis:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/profiles/public - Listar todos os perfis (público)
router.get('/public', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        cp.id, cp.name, cp.character, cp.anime, cp.image_url, cp.description, cp.voting_status, cp.final_score, cp.total_final_votes
      FROM cosplay_profiles cp
      ORDER BY cp.created_at DESC
    `);

    res.json({
      profiles: result.rows
    });
  } catch (error) {
    console.error('Erro ao listar perfis públicos:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/profiles/ranking - Obter ranking de perfis (inclui perfil atual com nota em tempo real)
router.get('/ranking', authenticateToken, async (req, res) => {
  try {
    console.log('🏆 Buscando ranking de perfis...');
    
    // Buscar perfil atualmente visível
    const currentProfileResult = await query(`
      SELECT cp.id as current_profile_id
      FROM voting_control vc
      LEFT JOIN cosplay_profiles cp ON vc.current_visible_profile_id = cp.id
      ORDER BY vc.id DESC
      LIMIT 1
    `);
    
    const currentProfileId = currentProfileResult.rows[0]?.current_profile_id;
    console.log('🎯 Perfil atual sendo votado:', currentProfileId);
    
    // Buscar perfis completados
    const completedResult = await query(`
      SELECT 
        id,
        name,
        character,
        anime,
        final_score,
        total_final_votes,
        voting_status,
        'completed' as source
      FROM cosplay_profiles
      WHERE voting_status = 'completed' AND final_score IS NOT NULL
    `);
    
    let rankingData = [...completedResult.rows];
    
    // Se há um perfil atual sendo votado, calcular sua nota em tempo real
    if (currentProfileId) {
      const currentProfileResult = await query(`
        SELECT 
          cp.id,
          cp.name,
          cp.character,
          cp.anime,
          cp.voting_status,
          COUNT(v.id) FILTER (WHERE v.submitted = true) as total_votes,
          ROUND(AVG((v.craftsmanship + v.accuracy + v.creativity + v.presentation + v.overall_impression) / 5.0), 2) as current_avg_score
        FROM cosplay_profiles cp
        LEFT JOIN votes v ON cp.id = v.cosplay_id
        WHERE cp.id = $1
        GROUP BY cp.id, cp.name, cp.character, cp.anime, cp.voting_status
      `, [currentProfileId]);
      
      if (currentProfileResult.rows.length > 0) {
        const currentProfile = currentProfileResult.rows[0];
        console.log('📊 Perfil atual com estatísticas:', currentProfile);
        
        // Adicionar perfil atual ao ranking com nota em tempo real
        const currentProfileRanking = {
          id: currentProfile.id,
          name: currentProfile.name,
          character: currentProfile.character,
          anime: currentProfile.anime,
          final_score: currentProfile.current_avg_score,
          total_final_votes: parseInt(currentProfile.total_votes),
          voting_status: 'active',
          source: 'current'
        };
        
        // Se não é um perfil já completado, adicionar ao ranking
        const isAlreadyCompleted = rankingData.some(p => p.id === currentProfile.id);
        if (!isAlreadyCompleted && currentProfile.current_avg_score > 0) {
          rankingData.push(currentProfileRanking);
        }
      }
    }
    
    // Ordenar por nota final (desc) e total de votos (desc)
    rankingData.sort((a, b) => {
      if (b.final_score !== a.final_score) {
        return (b.final_score || 0) - (a.final_score || 0);
      }
      return (b.total_final_votes || 0) - (a.total_final_votes || 0);
    });
    
    console.log('🏆 Ranking final com', rankingData.length, 'perfis:', 
      rankingData.map(p => `${p.name} (${p.final_score})`));
    
    res.json({ ranking: rankingData });
  } catch (error) {
    console.error('❌ Erro ao obter ranking:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/profiles/:id - Obter perfil específico
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        cp.*,
        u.name as created_by_name
      FROM cosplay_profiles cp
      LEFT JOIN users u ON cp.created_by = u.id
      WHERE cp.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Perfil não encontrado',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    res.json({
      profile: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/profiles - Criar novo perfil (apenas admin)
router.post('/', [
  body('name').isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('character').isLength({ min: 2 }).withMessage('Personagem deve ter pelo menos 2 caracteres'),
  body('anime').isLength({ min: 2 }).withMessage('Anime deve ter pelo menos 2 caracteres'),
  body('image_url').optional().isURL().withMessage('URL da imagem inválida'),
  body('description').optional().isLength({ max: 5000 }).withMessage('Descrição muito longa')
], authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { name, character, anime, image_url, description } = req.body;

    // Criar novo perfil
    const result = await query(`
      INSERT INTO cosplay_profiles (name, character, anime, image_url, description, created_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, character, anime, image_url || null, description || null, req.user.id]);

    const newProfile = result.rows[0];

    res.status(201).json({
      message: 'Perfil criado com sucesso',
      profile: newProfile
    });

    console.log(`✅ Perfil criado: ${newProfile.name} - ${newProfile.character} por ${req.user.name}`);
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/profiles/:id - Atualizar perfil (apenas admin)
router.put('/:id', [
  body('name').optional().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('character').optional().isLength({ min: 2 }).withMessage('Personagem deve ter pelo menos 2 caracteres'),
  body('anime').optional().isLength({ min: 2 }).withMessage('Anime deve ter pelo menos 2 caracteres'),
  body('image_url').optional().isURL().withMessage('URL da imagem inválida'),
  body('description').optional().isLength({ max: 5000 }).withMessage('Descrição muito longa')
], authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const { name, character, anime, image_url, description } = req.body;

    // Verificar se perfil existe
    const existingProfile = await query('SELECT id FROM cosplay_profiles WHERE id = $1', [id]);
    if (existingProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Perfil não encontrado',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Construir query de atualização dinamicamente
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (name !== undefined) {
      updateFields.push(`name = $${paramCount}`);
      updateValues.push(name);
      paramCount++;
    }
    if (character !== undefined) {
      updateFields.push(`character = $${paramCount}`);
      updateValues.push(character);
      paramCount++;
    }
    if (anime !== undefined) {
      updateFields.push(`anime = $${paramCount}`);
      updateValues.push(anime);
      paramCount++;
    }
    if (image_url !== undefined) {
      updateFields.push(`image_url = $${paramCount}`);
      updateValues.push(image_url);
      paramCount++;
    }
    if (description !== undefined) {
      updateFields.push(`description = $${paramCount}`);
      updateValues.push(description);
      paramCount++;
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    if (updateFields.length === 1) { // Apenas updated_at
      return res.status(400).json({
        error: 'Nenhum campo para atualizar',
        code: 'NO_FIELDS_TO_UPDATE'
      });
    }

    const updateQuery = `
      UPDATE cosplay_profiles 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await query(updateQuery, updateValues);
    const updatedProfile = result.rows[0];

    res.json({
      message: 'Perfil atualizado com sucesso',
      profile: updatedProfile
    });

    console.log(`✅ Perfil atualizado: ${updatedProfile.name} - ${updatedProfile.character} por ${req.user.name}`);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// DELETE /api/profiles/:id - Excluir perfil (apenas admin)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se perfil existe
    const existingProfile = await query('SELECT name, character FROM cosplay_profiles WHERE id = $1', [id]);
    if (existingProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Perfil não encontrado',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const profile = existingProfile.rows[0];

    // Excluir votos relacionados primeiro
    await query('DELETE FROM votes WHERE cosplay_id = $1', [id]);

    // Remover do controle de votação se estiver visível
    await query('UPDATE voting_control SET current_visible_profile_id = NULL WHERE current_visible_profile_id = $1', [id]);

    // Excluir perfil
    await query('DELETE FROM cosplay_profiles WHERE id = $1', [id]);

    res.json({
      message: 'Perfil excluído com sucesso'
    });

    console.log(`✅ Perfil excluído: ${profile.name} - ${profile.character} por ${req.user.name}`);
  } catch (error) {
    console.error('Erro ao excluir perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/profiles/:id/results - Obter resultados de votação de um perfil
router.get('/:id/results', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se perfil existe
    const profileResult = await query('SELECT name, character FROM cosplay_profiles WHERE id = $1', [id]);
    if (profileResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Perfil não encontrado',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Buscar votos do perfil
    const votesResult = await query(`
      SELECT 
        v.*,
        u.name as juror_name
      FROM votes v
      JOIN users u ON v.juror_id = u.id
      WHERE v.cosplay_id = $1 AND v.submitted = true
      ORDER BY v.created_at DESC
    `, [id]);

    const votes = votesResult.rows;
    const profile = profileResult.rows[0];

    // Calcular médias
    let averages = {};
    if (votes.length > 0) {
      const totals = votes.reduce((acc, vote) => ({
        craftsmanship: acc.craftsmanship + vote.craftsmanship,
        accuracy: acc.accuracy + vote.accuracy,
        creativity: acc.creativity + vote.creativity,
        presentation: acc.presentation + vote.presentation,
        overall_impression: acc.overall_impression + vote.overall_impression,
      }), { craftsmanship: 0, accuracy: 0, creativity: 0, presentation: 0, overall_impression: 0 });

      averages = {
        craftsmanship: (totals.craftsmanship / votes.length).toFixed(2),
        accuracy: (totals.accuracy / votes.length).toFixed(2),
        creativity: (totals.creativity / votes.length).toFixed(2),
        presentation: (totals.presentation / votes.length).toFixed(2),
        overall_impression: (totals.overall_impression / votes.length).toFixed(2),
        total: ((totals.craftsmanship + totals.accuracy + totals.creativity + totals.presentation + totals.overall_impression) / (votes.length * 5)).toFixed(2)
      };
    }

    res.json({
      profile,
      votes,
      averages,
      vote_count: votes.length
    });
  } catch (error) {
    console.error('Erro ao obter resultados:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/profiles/:id/finalize - Finalizar e salvar score de um perfil (apenas admin)
router.put('/:id/finalize', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { final_score, total_final_votes, voting_status } = req.body;

    // Verificar se perfil existe
    const existingProfile = await query('SELECT id, name, character FROM cosplay_profiles WHERE id = $1', [id]);
    if (existingProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Perfil não encontrado',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Validar dados
    if (final_score === undefined || total_final_votes === undefined || !voting_status) {
      return res.status(400).json({
        error: 'Dados obrigatórios: final_score, total_final_votes, voting_status',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }

    // Atualizar perfil com os dados finais
    const result = await query(`
      UPDATE cosplay_profiles
      SET 
        final_score = $1,
        total_final_votes = $2,
        voting_status = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `, [final_score, total_final_votes, voting_status, id]);

    const updatedProfile = result.rows[0];

    res.json({
      message: 'Perfil finalizado com sucesso',
      profile: updatedProfile
    });

    console.log(`✅ Perfil finalizado: ${updatedProfile.name} - Score: ${final_score}, Votos: ${total_final_votes}`);
  } catch (error) {
    console.error('Erro ao finalizar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// DELETE /api/profiles/ranking/clear - Limpar dados do ranking final (apenas admin)
router.delete('/ranking/clear', authenticateToken, requireAdmin, async (req, res) => {
  try {
    console.log('🗑️ Limpando dados do ranking final...');
    
    // Resetar os scores finais de todos os perfis
    await query(`
      UPDATE cosplay_profiles 
      SET 
        final_score = NULL,
        total_final_votes = NULL,
        voting_status = 'pending'
      WHERE voting_status = 'completed'
    `);
    
    console.log('✅ Ranking limpo com sucesso!');
    res.json({
      success: true,
      message: 'Ranking limpo com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao limpar ranking:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

module.exports = router;