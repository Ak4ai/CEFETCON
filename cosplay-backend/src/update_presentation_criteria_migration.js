const { query } = require('./config/database');

async function updatePresentationCriteria() {
  try {
    console.log('🔄 Iniciando migração para atualizar critérios de apresentação...');
    
    // Adicionar novas colunas se não existirem
    console.log('➕ Adicionando novas colunas...');
    
    await query(`
      ALTER TABLE votes 
      ADD COLUMN IF NOT EXISTS dificuldade DECIMAL(4,2) CHECK (dificuldade >= 1 AND dificuldade <= 10)
    `);
    
    await query(`
      ALTER TABLE votes 
      ADD COLUMN IF NOT EXISTS conteudo DECIMAL(4,2) CHECK (conteudo >= 1 AND conteudo <= 10)
    `);
    
    await query(`
      ALTER TABLE votes 
      ADD COLUMN IF NOT EXISTS criatividade DECIMAL(4,2) CHECK (criatividade >= 1 AND criatividade <= 10)
    `);
    
    console.log('✅ Novas colunas adicionadas: dificuldade, conteudo, criatividade');
    
    // Remover coluna performance antiga (se existir)
    console.log('🗑️ Removendo coluna antiga performance...');
    await query(`
      ALTER TABLE votes 
      DROP COLUMN IF EXISTS performance
    `);
    
    console.log('✅ Coluna performance removida');
    console.log('✅ Migração concluída com sucesso!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  }
}

updatePresentationCriteria();
