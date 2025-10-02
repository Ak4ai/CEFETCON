const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'cosplay_voting',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
});

const runMigration = async () => {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Iniciando migração...');
    
    // Adicionar coluna bonus
    await client.query(`
      ALTER TABLE cosplay_profiles 
      ADD COLUMN IF NOT EXISTS bonus BOOLEAN DEFAULT FALSE
    `);
    console.log("✅ Coluna 'bonus' adicionada à tabela 'cosplay_profiles'");
    
    // Adicionar coluna penalty
    await client.query(`
      ALTER TABLE cosplay_profiles 
      ADD COLUMN IF NOT EXISTS penalty BOOLEAN DEFAULT FALSE
    `);
    console.log("✅ Coluna 'penalty' adicionada à tabela 'cosplay_profiles'");
    
    console.log('✅ Migração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro na migração:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
};

runMigration();
