const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'cosplay_voting',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
});

// Procurar arquivo de backup
const backupFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('backup_') && f.endsWith('.sql'));

if (backupFiles.length === 0) {
  console.error('❌ Nenhum arquivo de backup encontrado!');
  console.log('💡 Execute primeiro: node backup_database.js');
  process.exit(1);
}

// Usar o backup mais recente
const backupFile = path.join(__dirname, backupFiles[backupFiles.length - 1]);

console.log('📥 Iniciando importação do banco de dados...');
console.log(`📊 Banco: ${process.env.DB_NAME || 'cosplay_voting'}`);
console.log(`📁 Arquivo: ${backupFile}`);

async function restoreDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('\n⏳ Lendo arquivo de backup...');
    const sqlContent = fs.readFileSync(backupFile, 'utf8');
    
    console.log('⏳ Executando comandos SQL...');
    
    // Dividir em comandos individuais
    const commands = sqlContent
      .split('\n')
      .filter(line => !line.startsWith('--') && line.trim() !== '');
    
    let currentCommand = '';
    let successCount = 0;
    
    for (const line of commands) {
      currentCommand += line + '\n';
      
      if (line.trim().endsWith(';')) {
        try {
          await client.query(currentCommand);
          successCount++;
        } catch (err) {
          // Ignorar alguns erros esperados (como truncate de tabela vazia)
          if (!err.message.includes('does not exist')) {
            console.warn('⚠️  Aviso:', err.message.split('\n')[0]);
          }
        }
        currentCommand = '';
      }
    }
    
    console.log(`\n✅ Importação concluída com sucesso!`);
    console.log(`📊 ${successCount} comandos executados`);
    
  } catch (error) {
    console.error('❌ Erro ao importar backup:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

restoreDatabase().catch(err => {
  console.error('❌ Erro fatal:', err.message);
  process.exit(1);
});
