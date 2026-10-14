# Frontend: interface do totem de recarga

Interface do **Totem** em que o Usuário consulta o Saldo e faz a Recarga da Carteirinha da UFMG. O design das 4 telas foi feito no Figma. Visão geral do projeto: [README da raiz](../README.md). Termos do domínio: [CONTEXT.md](../CONTEXT.md).

## Stack

- **Next.js 14** (App Router), **React 18**, **TypeScript 5**
- **SCSS Modules** (`sass`)
- Fonte Inter via `next/font/google`
- ESLint (`next/core-web-vitals`)

## Como rodar

O [backend](../backend/README.md) precisa estar rodando em `http://127.0.0.1:3001`.

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # build de produção
yarn start      # serve o build
yarn lint
```

## Telas e fluxo

| Rota | Arquivo | O que faz |
|---|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) | Tela inicial ("Evite filas!", "Recarregue sua carteirinha aqui!", logo). Simula a leitura NFC: um campo recebe o número de série e o botão **Buscar** chama `GET /user/:serialNumber`, salva a resposta no `localStorage` (`userData`) e vai para `/dados`. |
| `/dados` | [src/app/dados/page.tsx](src/app/dados/page.tsx) | Saudação conforme o horário, nome, foto de perfil e saldo em BRL. Botão **fazer recarga** leva para `/recarga`. |
| `/recarga` | [src/app/recarga/page.tsx](src/app/recarga/page.tsx) | Campo para o valor da Recarga. **confirmar** chama `POST /user/:serialNumber/:valor`, salva o valor no `localStorage` (`userRecharge`) e vai para `/sucesso`. |
| `/sucesso` | [src/app/sucesso/page.tsx](src/app/sucesso/page.tsx) | "Recarga Finalizada!" com o valor recarregado. **finalizar** limpa todo o `localStorage` e volta para `/`, encerrando a sessão de atendimento. |

### Estado entre telas

Não há gerenciador de estado global. As telas trocam dados pelo `localStorage`:

| Chave | Escrita em | Lida por | Conteúdo |
|---|---|---|---|
| `userData` | `/` | `useUserData` (`/dados`, `/recarga`) | Resposta de `GET /user/:serialNumber`, no formato `{ data: User }` |
| `userRecharge` | `/recarga` | `useUserRecharge` (`/sucesso`) | Valor digitado, como string JSON |

## Estrutura

```
frontend/
├── public/images/          ← logo, artes da tela inicial, GIFs (pensando, check), logo UFMG
├── src/
│   ├── app/                ← rotas (App Router) e layout raiz
│   │   ├── layout.tsx
│   │   ├── page.tsx        ← /
│   │   ├── dados/          ← /dados
│   │   ├── recarga/        ← /recarga
│   │   ├── sucesso/        ← /sucesso
│   │   └── utils/
│   │       ├── capitalizeString.ts    ← primeira letra maiúscula
│   │       └── formatBalanceValue.ts  ← number → "R$ 0,00" (pt-BR)
│   ├── components/
│   │   ├── button/         ← ButtonComponent: link (<a>) estilizado como botão
│   │   ├── greetings/      ← "Bom dia / Boa tarde / Boa noite", atualiza a cada segundo
│   │   └── spacer/         ← div com altura/largura fixas para espaçamento
│   ├── hooks/
│   │   ├── useUserData.tsx      ← lê userData do localStorage
│   │   └── useUserRecharge.tsx  ← lê userRecharge do localStorage
│   ├── interface/Iuser.ts  ← tipo User ({ data: {...} })
│   ├── mock/user.ts        ← usuário de exemplo (não é usado nas telas)
│   └── styles/             ← SCSS Modules de cada tela
├── next.config.js          ← libera imagens remotas do S3 (tcc-ufmg)
└── tsconfig.json           ← aliases @/* → src/*, public/* → public/*
```

A saudação de [Greetings](src/components/greetings/index.tsx) segue estas faixas: 6h–11h59 "Bom dia", 12h–17h59 "Boa tarde", e o resto do dia "Boa noite".

## Limitações conhecidas

- **URL da API fixa** (`http://127.0.0.1:3001`) em `page.tsx` e `recarga/page.tsx`, sem variável de ambiente.
- **Sem tratamento de erro na tela:** se o número de série não existir, a API responde 404, mas o frontend salva a resposta de erro e vai para `/dados` assim mesmo, e a tela quebra. A Recarga também não confere o status da resposta.
- **Sem validação do valor da Recarga:** o campo é texto livre. Vírgula decimal (`10,50`) é truncada pelo `parseFloat` da API.
- **Leitura NFC simulada** por campo de texto. O botão "aproxime sua carteirinha do sensor" só leva para `/dados`.
- A foto de perfil usa `<img>` direto, então o `remotePatterns` do `next.config.js` não tem efeito (e o `hostname` ali contém um caminho, que é inválido).
- Sobras do `create-next-app`: `metadata` "Create Next App", `src/app/page.module.css`, `src/styles/globals.css` e SVGs em `public/` não são usados.
- `<html lang="en">` deveria ser `pt-BR`.
- Layout com tamanhos fixos em px, pensado para a tela do totem.
