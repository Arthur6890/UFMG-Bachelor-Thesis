# Sistema de Carregamento da Carteirinha da UFMG

Protótipo de um **totem de autoatendimento** para recarregar a carteirinha da UFMG. Com ele, estudantes e servidores colocam crédito na carteirinha sem enfrentar fila no guichê, principalmente nos restaurantes universitários.

Monografia do tipo atividade tecnológica, Bacharelado em Sistemas de Informação, DCC/ICEx, UFMG, 2023.

- **Autor:** Arthur Pereira Ramos Amaral
- **Orientador:** Prof. Wagner Meira Junior
- **Relatório final:** [docs/monografia.pdf](docs/monografia.pdf)

## Motivação

A ideia é usar a carteirinha como meio de pagamento dentro da universidade (restaurantes universitários, bibliotecas, lanchonetes), como já acontece no CEFET-MG e nos ônibus de Belo Horizonte. Os objetivos são:

- reduzir o uso de dinheiro em espécie e de cartões de débito e crédito;
- diminuir filas e aglomerações nos pontos de pagamento;
- dar mais praticidade e segurança às transações dentro da UFMG.

Este trabalho (Monografia II) cobre só a **parte de crédito**, ou seja, a Recarga no totem. A **parte de débito** (cobrar pelo uso da carteirinha) e a integração com uma API de pagamento ficaram fora do escopo. As APIs de pagamento candidatas foram discutidas na Monografia I.

O vocabulário do domínio (Usuário, Carteirinha, Número de série, Saldo, Recarga...) está definido em [CONTEXT.md](CONTEXT.md).

## Arquitetura

```
┌───────────────────────┐   HTTP (fetch)   ┌───────────────────────┐   Mongoose   ┌──────────────┐
│ frontend/             │ ───────────────▶ │ backend/              │ ───────────▶ │ MongoDB      │
│ Next.js 14 (React 18) │                  │ Node.js + Express     │              │ db Monografia│
│ interface do totem    │ ◀─────────────── │ TypeScript, porta 3001│ ◀─────────── │ coleção User │
│ porta 3000            │       JSON       └───────────────────────┘              └──────────────┘
└───────────┬───────────┘
            │ <img src>
            ▼
   Amazon S3 (bucket público tcc-ufmg): fotos de perfil
```

| Parte | Tecnologia | Documentação |
|---|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, SCSS Modules | [frontend/README.md](frontend/README.md) |
| Backend | Node.js, Express 4, TypeScript, Mongoose 7 | [backend/README.md](backend/README.md) |
| Banco | MongoDB local (`mongodb://127.0.0.1/Monografia`) | [backend/README.md](backend/README.md#banco-de-dados) |
| Imagens | Amazon S3, bucket público | — |
| Design | Figma (4 telas) | — |

## Fluxo de uso (sessão de atendimento)

1. **Início (`/`)**: o Usuário aproxima a carteirinha do sensor. No protótipo, a leitura NFC é **simulada**: o número de série é digitado num campo e enviado com o botão "Buscar".
2. O frontend chama `GET /user/:serialNumber` e guarda o Usuário no `localStorage`.
3. **Dados (`/dados`)**: saudação conforme o horário (bom dia / boa tarde / boa noite), nome, foto e saldo atual.
4. **Recarga (`/recarga`)**: o Usuário digita o valor e confirma. O frontend chama `POST /user/:serialNumber/:valor`.
5. **Sucesso (`/sucesso`)**: mostra o valor recarregado. "Finalizar" limpa o `localStorage` e volta ao início para o próximo Usuário.

## Como rodar localmente

Pré-requisitos: Node.js 18+, Yarn ou npm, e MongoDB rodando em `127.0.0.1:27017`.

```bash
# 1. Banco: insira ao menos um usuário (ver backend/README.md)

# 2. Backend (porta 3001)
cd backend
npm install
npm start

# 3. Frontend (porta 3000), em outro terminal
cd frontend
yarn install
yarn dev
```

Abra http://localhost:3000, digite o número de série de um usuário cadastrado e clique em **Buscar**.

## Estrutura do repositório

```
.
├── README.md          ← este arquivo
├── CONTEXT.md         ← glossário do domínio
├── docs/
│   └── monografia.pdf ← relatório final
├── backend/           ← API REST (Express + MongoDB)
└── frontend/          ← interface do totem (Next.js)
```

## Limitações conhecidas

Este é um protótipo acadêmico. Ele **não** está pronto para produção:

- **Sem pagamento:** a Recarga credita o valor sem cobrar nada.
- **Sem autenticação:** qualquer pessoa que saiba um número de série consegue consultar ou recarregar a carteirinha.
- **Sem validação do valor:** a API aceita valores negativos ou que não são números (veja o README do backend).
- **Leitura NFC simulada:** o número de série é digitado.
- **Endereços fixos no código:** a URL da API (`http://127.0.0.1:3001`) e a do MongoDB estão escritas direto no código, sem variáveis de ambiente.
- **Bucket S3:** o bucket `tcc-ufmg` provavelmente não existe mais, então as fotos de perfil podem não carregar.
- **Sem testes automatizados.**
- Pequenas pendências: `backend/dist/` está versionado e tem arquivos antigos (`Section`), e o título da página continua o padrão "Create Next App".
