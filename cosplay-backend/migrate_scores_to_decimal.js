const { query } = require('./src/config/database');

(async () => {
  try {
    console.log('🔄 Alterando tipo das colunas de notas para NUMERIC(4,2)...');
    
    // Alterar colunas da tabela votes
    await query(`
      ALTER TABLE votes 
        ALTER COLUMN indumentaria TYPE NUMERIC(4,2),
        ALTER COLUMN similaridade TYPE NUMERIC(4,2),
        ALTER COLUMN qualidade TYPE NUMERIC(4,2),
        ALTER COLUMN interpretacao TYPE NUMERIC(4,2),
        ALTER COLUMN performance TYPE NUMERIC(4,2)
    `);
    
    console.log('✅ Colunas da tabela votes alteradas com sucesso');
    
    // Alterar coluna final_score da tabela cosplay_profiles
    await query(`
      ALTER TABLE cosplay_profiles 
        ALTER COLUMN final_score TYPE NUMERIC(4,2)
    `);
    
    console.log('✅ Coluna final_score da tabela cosplay_profiles alterada com sucesso');
    
    console.log('✅ Migração concluída! Agora você pode usar números decimais nas notas.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  }
})();
