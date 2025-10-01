const { pool, query } = require('./config/database');

const migrationScript = async () => {
  console.log('🚀 Iniciando migração do banco de dados para novos critérios de votação...');

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    console.log('BEGIN - Transação iniciada.');

    // 1. Fazer backup da tabela 'votes' (opcional, mas recomendado)
    console.log("1. Fazendo backup da tabela 'votes' para 'votes_backup'...");
    try {
      // Apaga backup antigo se existir
      await client.query('DROP TABLE IF EXISTS votes_backup');
      await client.query('CREATE TABLE votes_backup AS TABLE votes');
      console.log("   ✅ Backup 'votes_backup' criado com sucesso.");
    } catch (backupError) {
      console.warn("   ⚠️  Aviso: Não foi possível criar o backup. Pode ser que a tabela 'votes' ainda não exista. Continuando...");
    }

    // 2. Remover as colunas antigas da tabela 'votes'
    console.log("2. Removendo colunas antigas (craftsmanship, accuracy, etc.)...");
    const dropColumnsQuery = `
      ALTER TABLE votes
      DROP COLUMN IF EXISTS craftsmanship,
      DROP COLUMN IF EXISTS accuracy,
      DROP COLUMN IF EXISTS creativity,
      DROP COLUMN IF EXISTS presentation,
      DROP COLUMN IF EXISTS overall_impression;
    `;
    await client.query(dropColumnsQuery);
    console.log('   ✅ Colunas antigas removidas com sucesso.');

    // 3. Adicionar as novas colunas
    console.log('3. Adicionando novas colunas (indumentaria, similaridade, qualidade)...');
    const addColumnsQuery = `
      ALTER TABLE votes
      ADD COLUMN IF NOT EXISTS indumentaria INTEGER CHECK (indumentaria >= 1 AND indumentaria <= 10),
      ADD COLUMN IF NOT EXISTS similaridade INTEGER CHECK (similaridade >= 1 AND similaridade <= 10),
      ADD COLUMN IF NOT EXISTS qualidade INTEGER CHECK (qualidade >= 1 AND qualidade <= 10);
    `;
    await client.query(addColumnsQuery);
    console.log('   ✅ Novas colunas adicionadas com sucesso.');

    await client.query('COMMIT');
    console.log('COMMIT - Transação concluída.');
    console.log('🎉 Migração concluída com sucesso!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ ROLLBACK - Erro durante a migração. A transação foi revertida.');
    console.error(error);
  } finally {
    client.release();
    pool.end();
  }
};

migrationScript();