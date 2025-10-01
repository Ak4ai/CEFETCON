const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8080;

console.log('🚀 Iniciando servidor proxy...');

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Proxy para a API do backend - todas as rotas que começam com /api
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3001/api',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api do path para o backend
  },
  logLevel: 'info',
  onError: (err, req, res) => {
    console.error('❌ Erro no proxy da API:', err.message);
    res.status(500).json({ error: 'Erro no servidor backend' });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔄 Proxy API: ${req.method} ${req.url} -> http://localhost:3001/api${req.url}`);
  }
}));

// Proxy para o frontend Vite - todas as outras rotas
app.use('/', createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
  ws: true, // WebSocket support para Hot Module Replacement
  logLevel: 'info',
  onError: (err, req, res) => {
    console.error('❌ Erro no proxy do frontend:', err.message);
    res.status(500).send('Erro no servidor frontend');
  },
  onProxyReq: (proxyReq, req, res) => {
    if (!req.url.startsWith('/api')) {
      console.log(`🎨 Proxy Frontend: ${req.method} ${req.url} -> http://localhost:5173${req.url}`);
    }
  }
}));

app.listen(PORT, () => {
  console.log('🎯 ====================================');
  console.log('🔄 Servidor Proxy iniciado!');
  console.log('🎯 ====================================');
  console.log(`📡 Proxy rodando na porta: ${PORT}`);
  console.log(`🌐 URL local: http://localhost:${PORT}`);
  console.log(`🎨 Frontend: http://localhost:${PORT} -> http://localhost:5173`);
  console.log(`🔌 Backend API: http://localhost:${PORT}/api -> http://localhost:3001/api`);
  console.log('🎯 ====================================');
  console.log('💡 Para expor externamente: ngrok http 8080');
  console.log('🎯 ====================================');
});