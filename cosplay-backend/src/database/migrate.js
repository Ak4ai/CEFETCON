const { pool, query } = require('../config/database');

const migrateDatabase = async () => {
  console.log('🚀 Iniciando migração do banco de dados...');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    console.log('BEGIN - Transação iniciada.');

    // === Criação do Schema ===
    console.log('1. Criando tabelas se não existirem...');

    // Tabela de usuários
    await client.query(`
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
    console.log('   ✅ Tabela "users" pronta.');

    // Tabela de perfis de cosplay
    await client.query(`
      CREATE TABLE IF NOT EXISTS cosplay_profiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        character VARCHAR(255) NOT NULL,
        anime VARCHAR(255) NOT NULL,
        image_urls TEXT[],
        description TEXT,
        is_visible BOOLEAN DEFAULT FALSE,
        created_by INTEGER REFERENCES users(id),
        voting_status VARCHAR(20) DEFAULT 'pending' NOT NULL,
        final_score NUMERIC(4, 2),
        total_final_votes INTEGER,
        modality VARCHAR(20) DEFAULT 'desfile' NOT NULL CHECK (modality IN ('desfile', 'presentation')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✅ Tabela "cosplay_profiles" pronta.');

    // Tabela de votos com os novos critérios
    await client.query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        juror_id INTEGER REFERENCES users(id),
        cosplay_id INTEGER REFERENCES cosplay_profiles(id),
        indumentaria INTEGER CHECK (indumentaria >= 1 AND indumentaria <= 10),
        similaridade INTEGER CHECK (similaridade >= 1 AND similaridade <= 10),
        qualidade INTEGER CHECK (qualidade >= 1 AND qualidade <= 10),
        interpretacao INTEGER CHECK (interpretacao >= 1 AND interpretacao <= 10),
        performance INTEGER CHECK (performance >= 1 AND performance <= 10),
        submitted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(juror_id, cosplay_id)
      )
    `);
    console.log('   ✅ Tabela "votes" pronta.');

    // Tabela de controle de votação
    await client.query(`
      CREATE TABLE IF NOT EXISTS voting_control (
        id SERIAL PRIMARY KEY,
        current_visible_profile_id INTEGER REFERENCES cosplay_profiles(id),
        current_mode VARCHAR(20) DEFAULT 'desfile' NOT NULL CHECK (current_mode IN ('desfile', 'presentation')),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✅ Tabela "voting_control" pronta.');

    // Tabela de atividade dos jurados
    await client.query(`
      CREATE TABLE IF NOT EXISTS juror_activity (
        juror_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        last_seen TIMESTAMP NOT NULL
      )
    `);
    console.log('   ✅ Tabela "juror_activity" pronta.');

    // === Migração de Dados e Schema ===
    console.log('2. Aplicando migrações de schema e dados se necessário...');

    // a) Migrar tabela users: adicionar last_activity
    const usersColumns = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name='users'");
    if (!usersColumns.rows.find(c => c.column_name === 'last_activity')) {
      await client.query('ALTER TABLE users ADD COLUMN last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
      console.log('   ✅ Migrado "users": Adicionada coluna "last_activity".');
    }

    // b) Migrar tabela cosplay_profiles: image_url -> image_urls
    const profilesColumns = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name='cosplay_profiles'");
    if (profilesColumns.rows.find(c => c.column_name === 'image_url')) {
      await client.query('ALTER TABLE cosplay_profiles ADD COLUMN IF NOT EXISTS image_urls TEXT[]');
      await client.query('UPDATE cosplay_profiles SET image_urls = ARRAY[image_url] WHERE image_url IS NOT NULL');
      await client.query('ALTER TABLE cosplay_profiles DROP COLUMN image_url');
      console.log('   ✅ Migrado "cosplay_profiles": Coluna "image_url" convertida para "image_urls".');
    }
    
    // Adicionar coluna modality se não existir
    if (!profilesColumns.rows.find(c => c.column_name === 'modality')) {
      await client.query("ALTER TABLE cosplay_profiles ADD COLUMN modality VARCHAR(20) DEFAULT 'desfile' NOT NULL CHECK (modality IN ('desfile', 'presentation'))");
      console.log('   ✅ Migrado "cosplay_profiles": Adicionada coluna "modality".');
    }

    // c) Migrar tabela votes: critérios antigos -> novos
    const votesColumns = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name='votes'");
    if (votesColumns.rows.find(c => c.column_name === 'craftsmanship')) {
        await client.query(`
            ALTER TABLE votes
            DROP COLUMN IF EXISTS craftsmanship,
            DROP COLUMN IF EXISTS accuracy,
            DROP COLUMN IF EXISTS creativity,
            DROP COLUMN IF EXISTS presentation,
            DROP COLUMN IF EXISTS overall_impression;
        `);
        console.log('   ✅ Migrado "votes": Colunas de critérios antigas removidas.');
    }
    if (!votesColumns.rows.find(c => c.column_name === 'indumentaria')) {
        await client.query(`
            ALTER TABLE votes
            ADD COLUMN indumentaria INTEGER CHECK (indumentaria >= 1 AND indumentaria <= 10),
            ADD COLUMN similaridade INTEGER CHECK (similaridade >= 1 AND similaridade <= 10),
            ADD COLUMN qualidade INTEGER CHECK (qualidade >= 1 AND qualidade <= 10);
        `);
        console.log('   ✅ Migrado "votes": Novas colunas de critérios adicionadas.');
    }
    
    // Adicionar colunas de apresentação se não existirem
    if (!votesColumns.rows.find(c => c.column_name === 'interpretacao')) {
        await client.query(`
            ALTER TABLE votes
            ADD COLUMN interpretacao INTEGER CHECK (interpretacao >= 1 AND interpretacao <= 10),
            ADD COLUMN performance INTEGER CHECK (performance >= 1 AND performance <= 10);
        `);
        console.log('   ✅ Migrado "votes": Colunas de apresentação adicionadas.');
    }

    // 3. Dados Iniciais
    console.log('3. Inserindo dados iniciais se necessário...');
    const votingControlCount = await client.query('SELECT COUNT(*) FROM voting_control');
    if (votingControlCount.rows[0].count === '0') {
      await client.query("INSERT INTO voting_control (current_visible_profile_id, current_mode) VALUES (NULL, 'desfile')");
      console.log('   ✅ Dados iniciais inseridos em "voting_control".');
    }
    
    // Adicionar coluna current_mode se não existir
    const votingControlColumns = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name='voting_control'");
    if (!votingControlColumns.rows.find(c => c.column_name === 'current_mode')) {
      await client.query("ALTER TABLE voting_control ADD COLUMN current_mode VARCHAR(20) DEFAULT 'desfile' NOT NULL CHECK (current_mode IN ('desfile', 'presentation'))");
      console.log('   ✅ Migrado "voting_control": Adicionada coluna "current_mode".');
    }

    await client.query('COMMIT');
    console.log('COMMIT - Transação concluída.');
    console.log('🎉 Migração do banco de dados concluída com sucesso!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ ROLLBACK - Ocorreu um erro durante a migração. A transação foi revertida.');
    console.error(error);
  } finally {
    client.release();
  }
};

// Executar a migração
migrateDatabase().then(() => {
    pool.end();
});
