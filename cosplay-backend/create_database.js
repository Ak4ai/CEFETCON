const { Client } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
  // Conectar ao banco padrão 'postgres' para criar o novo banco
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // Conectar ao banco padrão
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao PostgreSQL');

    // Verificar se o banco já existe
    const checkResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'cosplay_voting'"
    );

    if (checkResult.rows.length > 0) {
      console.log('ℹ️  Banco de dados "cosplay_voting" já existe');
    } else {
      // Criar o banco de dados
      await client.query('CREATE DATABASE cosplay_voting');
      console.log('✅ Banco de dados "cosplay_voting" criado com sucesso!');
    }
  } catch (error) {
    console.error('❌ Erro ao criar banco de dados:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

createDatabase()
  .then(() => {
    console.log('\n🎉 Pronto! Agora você pode executar: node src/database/migrate.js');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro:', error);
    process.exit(1);
  });
