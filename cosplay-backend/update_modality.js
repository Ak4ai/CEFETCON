const { query } = require('./src/config/database');

(async () => {
  try {
    console.log('🔄 Atualizando campo modality dos perfis...');
    
    const result = await query(
      "UPDATE cosplay_profiles SET modality = 'desfile' WHERE modality IS NULL"
    );
    
    console.log('✅ Perfis atualizados:', result.rowCount);
    
    // Verificar os perfis
    const profiles = await query('SELECT id, name, modality FROM cosplay_profiles');
    console.log('📋 Perfis no banco:');
    profiles.rows.forEach(p => {
      console.log(`  - ${p.name}: ${p.modality}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
})();
