const { query } = require('./config/database');

async function addTimePenaltyColumn() {
  try {
    console.log('🔄 Adicionando coluna time_penalty...');
    
    // Adicionar coluna time_penalty
    await query(`
      ALTER TABLE cosplay_profiles 
      ADD COLUMN IF NOT EXISTS time_penalty DECIMAL(5,2) DEFAULT 0
    `);
    
    console.log('✅ Coluna time_penalty adicionada com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao adicionar coluna:', error);
    process.exit(1);
  }
}

addTimePenaltyColumn();
