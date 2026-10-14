# Backend: API do Sistema de Carregamento da Carteirinha da UFMG

API REST que consulta Usuários pelo número de série da Carteirinha e faz Recargas de Saldo. Visão geral do projeto: [README da raiz](../README.md). Termos do domínio: [CONTEXT.md](../CONTEXT.md).

## Stack

- Node.js + **Express 4**
- **TypeScript 5** (compilado com `tsc` para `dist/`)
- **Mongoose 7** + MongoDB
- `cors`
- `nodemon` (desenvolvimento)

## Como rodar

Pré-requisito: MongoDB escutando em `127.0.0.1:27017`.

```bash
npm install
npm start          # compila (tsc) e roda dist/server.js
```

Para desenvolvimento com recarga automática:

```bash
npx nodemon        # usa nodemon.json: observa src/, recompila e reinicia
```

A API sobe na porta **3001**. Dá para trocar com a variável `PORT`.

> O script `npm run nodemon` (`nodemon src/server.ts`) depende do `ts-node`. Prefira `npx nodemon`, que usa o `nodemon.json`.

## Estrutura

```
backend/
├── src/
│   ├── server.ts               ← cria o app Express, CORS, registra rotas, sobe na porta
│   ├── db.ts                   ← conecta no MongoDB (importado pelo server.ts)
│   ├── models/
│   │   └── user.model.ts       ← schema/model Mongoose do Usuário
│   └── routes/
│       └── user.routes.ts      ← rotas /user
├── dist/                       ← saída do tsc (versionada; contém arquivos antigos Section*)
├── nodemon.json
├── tsconfig.json
└── package.json
```

## Banco de dados

- **Conexão:** `mongodb://127.0.0.1/Monografia` (fixa em [src/db.ts](src/db.ts))
- **Banco:** `Monografia`
- **Coleção:** `User` (o relatório fala em `Users`, mas vale o que está no código)

### Documento `User`

| Campo | Tipo | Descrição |
|---|---|---|
| `_id` | ObjectId | Gerado pelo MongoDB |
| `serialNumber` | string | Número de série da Carteirinha (identificador NFC). Chave de busca |
| `name` | string | Primeiro nome. O frontend exibe com a primeira letra maiúscula |
| `surname` | string | Sobrenome |
| `balance` | number | Saldo em reais |
| `profilePhoto` | string | **URL completa** da foto de perfil (ex.: imagem no S3). O frontend usa esse valor direto no `<img src>` |

> O relatório descreve `profilePhoto` como "nome da imagem no bucket". Mas o frontend não monta a URL, então o campo precisa ter a URL inteira.

### Populando o banco

Os Usuários eram inseridos à mão. Exemplo com `mongosh`:

```js
use Monografia
db.User.insertOne({
  serialNumber: "1",
  name: "arthur",
  surname: "Pereira Ramos Amaral",
  balance: 100.00,
  profilePhoto: "https://exemplo.com/foto.jpg"
})
```

## Endpoints

As respostas de sucesso embrulham o Usuário em `{ "data": ... }`.

### `GET /user/:serialNumber`

Busca o Usuário pelo número de série da Carteirinha.

| Status | Corpo |
|---|---|
| 200 | `{ "data": { "_id", "serialNumber", "name", "surname", "balance", "profilePhoto", "__v" } }` |
| 404 | `{ "message": "Usuário não encontrado" }` |
| 500 | `{ "message": "Erro ao buscar usuário" }` |

```bash
curl http://127.0.0.1:3001/user/1
```

### `POST /user/:serialNumber/:recharge`

Faz uma Recarga: soma `recharge` (convertido com `parseFloat`) ao `balance` e salva. Não tem corpo; o valor vai na URL.

| Status | Corpo |
|---|---|
| 200 | `{ "data": <usuário com saldo atualizado> }` |
| 404 | `{ "message": "Usuário não encontrado" }` |
| 500 | texto puro: `Erro ao realizar operação: <erro>` |

```bash
curl -X POST http://127.0.0.1:3001/user/1/50.00
```

## CORS

O [server.ts](src/server.ts) libera qualquer origem (`Access-Control-Allow-Origin: *`) para `GET` e `POST`.

## Limitações conhecidas

- **Sem validação de `recharge`:** valores negativos diminuem o saldo; valores que não são números (`"abc"`) viram `NaN`, e o Mongoose deve recusar o save, devolvendo 500.
- **Atualização não atômica:** o código lê, soma e salva (`findOne` + `save`) em vez de usar `$inc`. Duas recargas ao mesmo tempo podem perder uma delas.
- **Sem autenticação nem autorização.**
- **Sem índice único** em `serialNumber`.
- Uma Recarga deveria ser um `PATCH`/`POST` com o valor no corpo, não na URL.
- URL do MongoDB fixa no código. A mensagem de erro do `db.ts` diz "MonografiaII", mas o banco se chama `Monografia`.
- `dist/` está versionado e tem arquivos antigos (`models/Section.*`, `routes/sectionRoutes.*`) que não existem mais em `src/`.
- No middleware de CORS, `app.use(cors())` é chamado a cada requisição. Funciona, mas o certo é registrar uma vez só.
