const { query } = require('../config/database');

// Script para criar as tabelas do banco de dados
const createTables = async () => {
  try {
    console.log('🚀 Iniciando migração do banco de dados...');

    // Tabela de usuários
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'juror')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela users criada');

    // Tabela de perfis de cosplay
    await query(`
      CREATE TABLE IF NOT EXISTS cosplay_profiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        character VARCHAR(255) NOT NULL,
        anime VARCHAR(255) NOT NULL,
        image_url TEXT,
        description TEXT,
        is_visible BOOLEAN DEFAULT FALSE,
        created_by INTEGER REFERENCES users(id),
        voting_status VARCHAR(20) DEFAULT 'pending' NOT NULL, -- pending, active, completed
        final_score NUMERIC(4, 2),
        total_final_votes INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela cosplay_profiles criada');

    // Tabela de votos
    await query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        juror_id INTEGER REFERENCES users(id),
        cosplay_id INTEGER REFERENCES cosplay_profiles(id),
        craftsmanship INTEGER CHECK (craftsmanship >= 1 AND craftsmanship <= 10),
        accuracy INTEGER CHECK (accuracy >= 1 AND accuracy <= 10),
        creativity INTEGER CHECK (creativity >= 1 AND creativity <= 10),
        presentation INTEGER CHECK (presentation >= 1 AND presentation <= 10),
        overall_impression INTEGER CHECK (overall_impression >= 1 AND overall_impression <= 10),
        submitted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(juror_id, cosplay_id)
      )
    `);
    console.log('✅ Tabela votes criada');

    // Tabela para controle de votação
    await query(`
      CREATE TABLE IF NOT EXISTS voting_control (
        id SERIAL PRIMARY KEY,
        current_visible_profile_id INTEGER REFERENCES cosplay_profiles(id),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela voting_control criada');

    // Tabela para rastrear atividade dos jurados (presença)
    await query(`
      CREATE TABLE IF NOT EXISTS juror_activity (
        juror_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        last_seen TIMESTAMP NOT NULL
      )
    `);
    console.log('✅ Tabela juror_activity criada');

    // Adicionar coluna last_activity se não existir
    await query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'last_activity'
        ) THEN 
          ALTER TABLE users ADD COLUMN last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        END IF; 
      END $$;
    `);
    console.log('✅ Coluna last_activity adicionada à tabela users');

    // Inserir registro inicial de controle
    await query(`
      INSERT INTO voting_control (current_visible_profile_id)
      SELECT NULL
      WHERE NOT EXISTS (SELECT 1 FROM voting_control)
    `);

    console.log('🎉 Migração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    throw error;
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  createTables()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { createTables };