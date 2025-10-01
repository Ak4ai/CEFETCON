# 🎭 Backend API - Sistema de Votação de Cosplay

Backend completo para sistema de votação de concurso de cosplay, desenvolvido com Node.js, Express e PostgreSQL.

## 🚀 **CONFIGURAÇÃO INICIAL**

### **1. Pré-requisitos**
- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

### **2. Instalação**
```bash
# Clonar dependências (já feito)
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### **3. Configuração do PostgreSQL**
```sql
-- Conecte ao PostgreSQL e crie o banco
CREATE DATABASE cosplay_voting;

-- Criar usuário (opcional)
CREATE USER cosplay_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE cosplay_voting TO cosplay_user;
```

### **4. Executar Migrações**
```bash
# Criar tabelas
npm run migrate

# Popular com dados de exemplo
npm run seed
```

### **5. Iniciar Servidor**
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

## 📊 **ESTRUTURA DO BANCO DE DADOS**

### **Tabelas Principais:**
- `users` - Usuários (admin/jurados)
- `cosplay_profiles` - Perfis dos cosplays
- `votes` - Votos dos jurados
- `voting_control` - Controle de qual perfil está visível

### **Usuários de Teste (após seed):**
- **Admin:** admin@cosplay.com / 123456
- **Jurado 1:** jurado1@cosplay.com / 123456
- **Jurado 2:** jurado2@cosplay.com / 123456
- **Jurado 3:** jurado3@cosplay.com / 123456

## 🔗 **ENDPOINTS DA API**

### **🔐 Autenticação (`/api/auth`)**
```http
POST /api/auth/login          # Login do usuário
POST /api/auth/register       # Registro (apenas admin)
GET  /api/auth/me             # Dados do usuário logado
POST /api/auth/refresh        # Renovar token
```

### **📄 Perfis (`/api/profiles`)**
```http
GET    /api/profiles          # Listar todos os perfis
GET    /api/profiles/:id      # Obter perfil específico
POST   /api/profiles          # Criar perfil (admin)
PUT    /api/profiles/:id      # Atualizar perfil (admin)
DELETE /api/profiles/:id      # Excluir perfil (admin)
GET    /api/profiles/:id/results  # Resultados de um perfil
```

### **🗳️ Votos (`/api/votes`)**
```http
GET    /api/votes/my          # Meus votos (jurado)
POST   /api/votes             # Criar/atualizar voto (jurado)
GET    /api/votes/check/:id   # Verificar se já votei
DELETE /api/votes/:id         # Excluir meu voto
GET    /api/votes/profile/:id # Votos de um perfil (admin)
GET    /api/votes/statistics  # Estatísticas gerais (admin)
```

### **🎯 Controle de Votação (`/api/voting`)**
```http
GET  /api/voting/current      # Perfil atualmente visível
PUT  /api/voting/set-visible/:id  # Definir perfil visível (admin)
GET  /api/voting/status       # Status da votação (admin)
POST /api/voting/close        # Fechar votação atual (admin)
```

## 🛠️ **EXEMPLO DE USO**

### **1. Login:**
```javascript
const response = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@cosplay.com',
    password: '123456',
    role: 'admin'
  })
});

const { user, token } = await response.json();
```

### **2. Criar Perfil (Admin):**
```javascript
const response = await fetch('http://localhost:3001/api/profiles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Maria Silva',
    character: 'Nezuko',
    anime: 'Demon Slayer',
    image_url: 'https://example.com/image.jpg',
    description: 'Cosplay incrível...'
  })
});
```

### **3. Votar (Jurado):**
```javascript
const response = await fetch('http://localhost:3001/api/votes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    cosplay_id: 1,
    craftsmanship: 9,
    accuracy: 8,
    creativity: 10,
    presentation: 9,
    overall_impression: 9,
    submitted: true
  })
});
```

## 🔧 **CONFIGURAÇÕES DO .env**

```env
# Servidor
PORT=3001
NODE_ENV=development

# Banco PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cosplay_voting
DB_USER=postgres
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=sua_chave_super_secreta

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 📝 **SCRIPTS DISPONÍVEIS**

```bash
npm start        # Iniciar em produção
npm run dev      # Desenvolvimento com nodemon
npm run migrate  # Executar migrações
npm run seed     # Popular banco com dados de teste
```

## 🛡️ **SEGURANÇA IMPLEMENTADA**

- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Validação de entrada com express-validator
- ✅ Headers de segurança com helmet
- ✅ CORS configurado
- ✅ Middleware de autorização por papel
- ✅ Sanitização de dados

## 📊 **SISTEMA DE NOTAS**

Cada voto possui 5 critérios (notas de 1 a 10):
- **Craftsmanship** - Qualidade da confecção
- **Accuracy** - Fidelidade ao personagem
- **Creativity** - Criatividade
- **Presentation** - Apresentação/Performance
- **Overall Impression** - Impressão geral

## 🔄 **PRÓXIMOS PASSOS**

1. Configure o PostgreSQL
2. Execute `npm run migrate`
3. Execute `npm run seed`
4. Inicie com `npm run dev`
5. Teste no health check: http://localhost:3001/health
6. Integre com o frontend

## 🐛 **TROUBLESHOOTING**

**Erro de conexão com PostgreSQL:**
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no .env
- Teste a conexão: `psql -h localhost -U postgres -d cosplay_voting`

**Erro de JWT:**
- Verifique se JWT_SECRET está definido no .env
- Token pode ter expirado (24h)

**Erro de CORS:**
- Verifique CORS_ORIGIN no .env
- Frontend deve estar na URL correta

---

🎉 **Backend pronto para integração com o frontend!**