const { query } = require('./src/config/database');

async function inspectDatabase() {
  try {
    console.log('🔍 Inspecionando estrutura do banco de dados...\n');
    
    // Inspecionar tabela cosplay_profiles
    console.log('📋 Tabela: cosplay_profiles');
    console.log('=' .repeat(80));
    const profilesColumns = await query(`
      SELECT column_name, data_type, character_maximum_length, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'cosplay_profiles'
      ORDER BY ordinal_position
    `);
    
    if (profilesColumns.rows.length === 0) {
      console.log('⚠️  Tabela cosplay_profiles não encontrada!');
    } else {
      profilesColumns.rows.forEach(col => {
        console.log(`  - ${col.column_name.padEnd(25)} | ${col.data_type.padEnd(20)} | Nullable: ${col.is_nullable}`);
      });
    }
    
    console.log('\n');
    
    // Inspecionar tabela votes
    console.log('📋 Tabela: votes');
    console.log('=' .repeat(80));
    const votesColumns = await query(`
      SELECT column_name, data_type, character_maximum_length, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'votes'
      ORDER BY ordinal_position
    `);
    
    if (votesColumns.rows.length === 0) {
      console.log('⚠️  Tabela votes não encontrada!');
    } else {
      votesColumns.rows.forEach(col => {
        console.log(`  - ${col.column_name.padEnd(25)} | ${col.data_type.padEnd(20)} | Nullable: ${col.is_nullable}`);
      });
    }
    
    console.log('\n');
    
    // Verificar colunas críticas
    console.log('🔎 Verificando colunas críticas para o ranking...');
    console.log('=' .repeat(80));
    
    const criticalProfilesCols = ['bonus', 'penalty', 'time_penalty', 'modality', 'final_score'];
    const criticalVotesCols = ['indumentaria', 'similaridade', 'qualidade', 'interpretacao', 'dificuldade', 'conteudo', 'criatividade'];
    
    console.log('\n✅ Colunas em cosplay_profiles:');
    criticalProfilesCols.forEach(colName => {
      const exists = profilesColumns.rows.find(c => c.column_name === colName);
      if (exists) {
        console.log(`  ✓ ${colName.padEnd(25)} | ${exists.data_type}`);
      } else {
        console.log(`  ✗ ${colName.padEnd(25)} | AUSENTE`);
      }
    });
    
    console.log('\n✅ Colunas em votes:');
    criticalVotesCols.forEach(colName => {
      const exists = votesColumns.rows.find(c => c.column_name === colName);
      if (exists) {
        console.log(`  ✓ ${colName.padEnd(25)} | ${exists.data_type}`);
      } else {
        console.log(`  ✗ ${colName.padEnd(25)} | AUSENTE`);
      }
    });
    
    console.log('\n✅ Inspeção concluída!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inspecionar banco:', error);
    process.exit(1);
  }
}

inspectDatabase();
