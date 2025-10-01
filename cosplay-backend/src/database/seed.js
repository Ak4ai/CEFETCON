const bcrypt = require('bcrypt');
const { query } = require('../config/database');

// Script para popular o banco com dados iniciais
const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Hash da senha padrão (123456)
    const passwordHash = await bcrypt.hash('123456', 12);

    // Inserir usuários de teste
    const users = [
      { name: 'Administrador', email: 'admin@cosplay.com', role: 'admin' },
      { name: 'Jurado 1', email: 'jurado1@cosplay.com', role: 'juror' },
      { name: 'Jurado 2', email: 'jurado2@cosplay.com', role: 'juror' },
      { name: 'Jurado 3', email: 'jurado3@cosplay.com', role: 'juror' },
    ];

    for (const user of users) {
      await query(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
      `, [user.name, user.email, passwordHash, user.role]);
    }
    console.log('✅ Usuários de teste criados');

    // Inserir perfis de exemplo
    const adminUser = await query('SELECT id FROM users WHERE email = $1', ['admin@cosplay.com']);
    const adminId = adminUser.rows[0]?.id;

    if (adminId) {
      const profiles = [
        {
          name: 'Maria Silva',
          character: 'Nezuko Kamado',
          anime: 'Demon Slayer',
          image_urls: ['https://example.com/nezuko.jpg'],
          description: 'Cosplay incrível da Nezuko com detalhes perfeitos no kimono e na caixa de bambu.'
        },
        {
          name: 'João Santos',
          character: 'Edward Elric',
          anime: 'Fullmetal Alchemist',
          image_urls: ['https://example.com/edward.jpg'],
          description: 'Representação impressionante do Edward com automail funcional e casaco vermelho autêntico.'
        },
        {
          name: 'Ana Costa',
          character: 'Sailor Moon',
          anime: 'Sailor Moon',
          image_urls: ['https://example.com/sailormoon.jpg'],
          description: 'Cosplay clássico da Sailor Moon com todos os acessórios e poses icônicas.'
        }
      ];

      for (const profile of profiles) {
        await query(`
          INSERT INTO cosplay_profiles (name, character, anime, image_urls, description, created_by)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [profile.name, profile.character, profile.anime, profile.image_urls, profile.description, adminId]);
      }
      console.log('✅ Perfis de exemplo criados');
    }

    console.log('🎉 Seed concluído com sucesso!');
    console.log('');
    console.log('👤 Usuários criados:');
    console.log('   Admin: admin@cosplay.com / 123456');
    console.log('   Jurado: jurado1@cosplay.com / 123456');
    console.log('   Jurado: jurado2@cosplay.com / 123456');
    console.log('   Jurado: jurado3@cosplay.com / 123456');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { seedDatabase };