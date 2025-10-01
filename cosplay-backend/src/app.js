const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Importar rotas
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profiles');
const voteRoutes = require('./routes/votes');
const votingRoutes = require('./routes/voting');
const presenceRoutes = require('./routes/presence');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de segurança
app.use(helmet());

// CORS configurado para permitir o frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://cosplay-frontend.loca.lt',
    'https://modern-waves-wave.loca.lt'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/voting', votingRoutes);
app.use('/api/presence', presenceRoutes);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    code: 'ROUTE_NOT_FOUND',
    path: req.originalUrl
  });
});

// Middleware global de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  
  res.status(error.status || 500).json({
    error: error.message || 'Erro interno do servidor',
    code: error.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Função para inicializar o servidor
const startServer = async () => {
  try {
    // Testar conexão com o banco
    console.log('🔍 Testando conexão com o banco de dados...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Não foi possível conectar ao banco de dados');
      console.error('💡 Verifique se o PostgreSQL está rodando e as credenciais no .env estão corretas');
      process.exit(1);
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 ====================================');
      console.log('🎭 API de Votação de Cosplay iniciada!');
      console.log('🚀 ====================================');
      console.log(`📡 Servidor rodando na porta: ${PORT}`);
      console.log(`🌐 URL local: http://localhost:${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🎯 CORS permitido para: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
      console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log('');
      console.log('📋 Rotas disponíveis:');
      console.log('   🔐 POST /api/auth/login - Login');
      console.log('   👤 POST /api/auth/register - Registro (admin)');
      console.log('   👤 GET  /api/auth/me - Dados do usuário');
      console.log('   📄 GET  /api/profiles - Listar perfis');
      console.log('   📄 POST /api/profiles - Criar perfil (admin)');
      console.log('   📄 PUT  /api/profiles/:id - Atualizar perfil (admin)');
      console.log('   📄 DELETE /api/profiles/:id - Excluir perfil (admin)');
      console.log('   🗳️  GET  /api/votes/my - Meus votos (jurado)');
      console.log('   🗳️  POST /api/votes - Votar (jurado)');
      console.log('   🎯 GET  /api/voting/current - Perfil atual');
      console.log('   🎯 PUT  /api/voting/set-visible/:id - Definir visível (admin)');
      console.log('   📊 GET  /api/voting/status - Status da votação (admin)');
      console.log('   📡 POST /api/presence/ping - Ping de presença (jurado)');
      console.log('   📊 GET  /api/votes/statistics - Estatísticas (admin)');
      console.log('');
      console.log('💡 Para configurar o banco:');
      console.log('   npm run migrate  # Criar tabelas');
      console.log('   npm run seed     # Dados de exemplo');
      console.log('🚀 ====================================');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
    process.exit(1);
  }
};

// Tratamento graceful de shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutdown solicitado...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Servidor sendo finalizado...');
  process.exit(0);
});

// Inicializar servidor
startServer();

module.exports = app;