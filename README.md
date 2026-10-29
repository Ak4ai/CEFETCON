# CEFETCON – Sistema de avaliação do concurso de cosplay

Sistema web que organizou a **votação do concurso de cosplay do CEFETCON**: o administrador cadastra os participantes e controla a votação, os jurados dão as notas pelo celular e o público acompanha a participante em exibição.

Feito para o evento, em poucos dias, com **React + TypeScript** no front-end e **Node.js + PostgreSQL** no back-end.

## Perfis de uso

| Perfil | O que faz |
|---|---|
| **Administrador** | Cadastra participantes, escolhe a modalidade, libera quem está em exibição, encerra a votação, aplica bônus e penalidades (inclusive de tempo), finaliza resultados e limpa o ranking |
| **Jurado** | Entra com login, vê a participante em exibição, envia, confere ou apaga o próprio voto e informa presença |
| **Público** | Vê a participante atual e o resultado, sem login |

## Modalidades

- **Desfile:** média de 3 critérios (indumentária, similaridade e qualidade).
- **Apresentação:** média de 5 critérios (os três anteriores, mais interpretação e performance).

O administrador alterna a modalidade no painel, e a nota final é calculada de acordo com ela.

## Arquitetura

```
cosplay-voting-system/   Front-end (React 19, TypeScript, Vite, styled-components)
  pages/                 LoginPage, AdminDashboard, JurorVoting, SpectatorView
cosplay-backend/         API REST (Node.js, Express 5, PostgreSQL)
  routes/                auth, profiles, votes, voting, presence
```

- **Autenticação** com JWT e senhas com bcrypt. Os papéis `admin` e `juror` protegem as rotas no servidor.
- **Segurança básica:** Helmet, CORS restrito, validação das entradas com `express-validator`.
- **Banco:** migrações automáticas, dados de exemplo (`seed`) e scripts de backup e restauração.

### Rotas principais da API

| Prefixo | Exemplos |
|---|---|
| `/api/auth` | `POST /login`, `GET /me`, `POST /refresh` |
| `/api/profiles` | listar, criar, editar, `GET /ranking`, `PUT /:id/finalize`, `PUT /:id/bonus-penalty` |
| `/api/votes` | `POST /` (jurado vota), `GET /my`, `GET /statistics` (admin) |
| `/api/voting` | `GET /current`, `PUT /set-mode`, `PUT /set-visible/:profileId`, `POST /close` |
| `/api/presence` | `POST /ping` (presença do jurado) |

## Como rodar

Requer **Node.js 18+** e **PostgreSQL 12+**.

```bash
# Back-end
cd cosplay-backend
npm install
cp .env.example .env        # configure o banco e um JWT_SECRET próprio
npm run migrate             # cria as tabelas
npm run seed                # dados e usuários de exemplo
npm run dev                 # http://localhost:3001

# Front-end (em outro terminal)
cd cosplay-voting-system
npm install
npm run dev                 # http://localhost:5173
```

> Os usuários criados pelo `seed` são só para desenvolvimento. Troque as senhas e o `JWT_SECRET` antes de usar em outro ambiente, e nunca versione o `.env`.

## Documentos do projeto

[`MODALIDADE_APRESENTACAO.md`](MODALIDADE_APRESENTACAO.md) · [`FRONTEND_IMPLEMENTATION.md`](FRONTEND_IMPLEMENTATION.md) · [`TESTING_GUIDE.md`](TESTING_GUIDE.md) · [`BUG_FIX_MODALITY.md`](BUG_FIX_MODALITY.md)

---

Feito por [Henrique de Freitas Araújo](https://github.com/Ak4ai) para o CEFETCON.
