const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'cosplay_voting',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
});

// Nome do arquivo de backup com data/hora
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupFile = path.join(__dirname, `backup_${timestamp}.sql`);

console.log('🗄️  Iniciando backup do banco de dados...');
console.log(`📊 Banco: ${process.env.DB_NAME || 'cosplay_voting'}`);
console.log(`📁 Arquivo: ${backupFile}`);

async function backupDatabase() {
  const client = await pool.connect();
  
  try {
    let sqlOutput = '-- PostgreSQL Database Backup\n';
    sqlOutput += `-- Generated: ${new Date().toISOString()}\n`;
    sqlOutput += `-- Database: ${process.env.DB_NAME || 'cosplay_voting'}\n\n`;
    
    console.log('\n⏳ Exportando estrutura das tabelas...');
    
    // Lista de tabelas
    const tables = ['users', 'cosplay_profiles', 'votes', 'voting_control', 'juror_activity'];
    
    for (const table of tables) {
      console.log(`  📋 Exportando tabela: ${table}`);
      
      // Pegar dados da tabela
      const result = await client.query(`SELECT * FROM ${table}`);
      
      if (result.rows.length === 0) {
        sqlOutput += `-- Tabela ${table} está vazia\n\n`;
        continue;
      }
      
      sqlOutput += `-- Dados da tabela: ${table}\n`;
      sqlOutput += `TRUNCATE TABLE ${table} CASCADE;\n`;
      
      // Gerar INSERTs
      for (const row of result.rows) {
        const columns = Object.keys(row);
        const values = columns.map(col => {
          const val = row[col];
          if (val === null) return 'NULL';
          if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
          if (typeof val === 'number') return val;
          if (Array.isArray(val)) return `ARRAY[${val.map(v => `'${v.replace(/'/g, "''")}'`).join(',')}]`;
          if (val instanceof Date) return `'${val.toISOString()}'`;
          return `'${String(val).replace(/'/g, "''")}'`;
        });
        
        sqlOutput += `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
      }
      
      sqlOutput += '\n';
    }
    
    // Resetar sequences
    sqlOutput += '-- Resetar sequences\n';
    sqlOutput += `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));\n`;
    sqlOutput += `SELECT setval('cosplay_profiles_id_seq', (SELECT MAX(id) FROM cosplay_profiles));\n`;
    sqlOutput += `SELECT setval('votes_id_seq', (SELECT MAX(id) FROM votes));\n`;
    sqlOutput += `SELECT setval('voting_control_id_seq', (SELECT MAX(id) FROM voting_control));\n\n`;
    
    // Salvar arquivo
    fs.writeFileSync(backupFile, sqlOutput, 'utf8');
    
    console.log('\n✅ Backup concluído com sucesso!');
    console.log(`📦 Arquivo salvo em: ${backupFile}`);
    console.log(`📊 Tamanho: ${(fs.statSync(backupFile).size / 1024).toFixed(2)} KB`);
    console.log('\n📋 Para importar em outro PC:');
    console.log(`   1. Copie o arquivo ${path.basename(backupFile)}`);
    console.log(`   2. Execute: node restore_database.js`);
    
  } catch (error) {
    console.error('❌ Erro ao criar backup:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

backupDatabase().catch(err => {
  console.error('❌ Erro fatal:', err.message);
  process.exit(1);
});
