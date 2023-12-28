# Ecotrace Github

[![Run Tests](https://github.com/alexandrebekor/web-ecotrace-github/actions/workflows/run-tests.yml/badge.svg)](https://github.com/alexandrebekor/web-ecotrace-github/actions/workflows/run-tests.yml)

Desafio: Projeto de listagem de repositórios do Github, com suporte a cadastro/edição do usuário de acesso, visualização de repositórios de terceiros com persistencia de histórico de consulta.

> Esse projeto é público e você pode acompanhar o progresso dele pelo painel: (Github Projects)[https://github.com/users/alexandrebekor/projects/77]

## Tech Stack

Front:

- React (Next.js 14)
- Typescript
- Tailwind.css

Backend:

- Node
- Typescript
- Postgres
- Fastify
- Prisma ORM

## Run Locally

> O projeto está encapsulado em um monorepo orquestrado pelo Turbopack.

1. Realize o preenchimento das variáveis de ambiente considerando os arquivos `.env.example`, eles estão em:

```bash
/.env.example
/apps/api/.env.example
/apps/web/.env.example
```

2. Prepare o ambiente executando o arquivo `docker-compose.yml` na raiz do projeto.

```bash
docker-compose up -d
```

3. Execute a instalação dos pacotes:

```bash
npm run install
```

4. Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

## Runnig Tests
A API possui Testes Unitários e E2E que podem ser executados pelos comandos:

```bash
# unit test
npm run test

# e2e
npm run test:e2e
```
