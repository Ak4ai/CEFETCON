const { query } = require('./src/config/database');

async function runMissingMigrations() {
  try {
    console.log('🚀 Rodando migrations faltantes...\n');
    
    // 1. Adicionar coluna time_penalty
    console.log('1️⃣ Adicionando coluna time_penalty em cosplay_profiles...');
    await query(`
      ALTER TABLE cosplay_profiles 
      ADD COLUMN IF NOT EXISTS time_penalty DECIMAL(5,2) DEFAULT 0
    `);
    console.log('✅ Coluna time_penalty adicionada!\n');
    
    // 2. Adicionar colunas de apresentação em votes
    console.log('2️⃣ Adicionando colunas de apresentação em votes...');
    
    await query(`
      ALTER TABLE votes 
      ADD COLUMN IF NOT EXISTS dificuldade DECIMAL(4,2) CHECK (dificuldade >= 1 AND dificuldade <= 10)
    `);
    console.log('✅ Coluna dificuldade adicionada!');
    
    await query(`
      ALTER TABLE votes 
      ADD COLUMN IF NOT EXISTS conteudo DECIMAL(4,2) CHECK (conteudo >= 1 AND conteudo <= 10)
    `);
    console.log('✅ Coluna conteudo adicionada!');
    
    await query(`
      ALTER TABLE votes 
      ADD COLUMN IF NOT EXISTS criatividade DECIMAL(4,2) CHECK (criatividade >= 1 AND criatividade <= 10)
    `);
    console.log('✅ Coluna criatividade adicionada!\n');
    
    console.log('🎉 Todas as migrations faltantes foram aplicadas com sucesso!');
    console.log('\n🔍 Verificando estrutura final...\n');
    
    // Verificar colunas críticas novamente
    const profilesColumns = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'cosplay_profiles' AND column_name IN ('bonus', 'penalty', 'time_penalty', 'modality', 'final_score')
      ORDER BY column_name
    `);
    
    const votesColumns = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'votes' AND column_name IN ('indumentaria', 'similaridade', 'qualidade', 'interpretacao', 'dificuldade', 'conteudo', 'criatividade')
      ORDER BY column_name
    `);
    
    console.log('✅ Colunas em cosplay_profiles:');
    profilesColumns.rows.forEach(col => {
      console.log(`  ✓ ${col.column_name.padEnd(25)} | ${col.data_type}`);
    });
    
    console.log('\n✅ Colunas em votes:');
    votesColumns.rows.forEach(col => {
      console.log(`  ✓ ${col.column_name.padEnd(25)} | ${col.data_type}`);
    });
    
    console.log('\n✅ Backend pronto para uso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao rodar migrations:', error);
    process.exit(1);
  }
}

runMissingMigrations();
