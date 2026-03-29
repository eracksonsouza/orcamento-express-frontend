# Orçamento Express Front

Aplicação frontend para gestão de oficina, com foco em produtividade operacional: cadastro de clientes e veículos, acompanhamento de orçamentos e fluxo guiado para criação de propostas.

Projeto desenvolvido com arquitetura de componentes reutilizáveis, tipagem forte e base pronta para integração com API.

## Valor de Produto

Este sistema foi desenhado para reduzir fricção no dia a dia da oficina:

- centraliza dados de clientes, veículos e orçamentos em um único fluxo
- acelera a criação de orçamento com wizard por etapas
- melhora visibilidade operacional com dashboard de indicadores e status
- facilita evolução para ambiente real com API, sem retrabalho estrutural no frontend

## Destaques Técnicos (para recrutadores)

- React 19 + TypeScript com foco em segurança de tipos e manutenção
- Estrutura por domínio (`pages/*`) e componentes coesos/reaproveitáveis
- Padronização de tipos compartilhados em `types.ts` para reduzir duplicação
- Rotas organizadas com React Router (`/dashboard`, `/clientes`, `/veiculos`, `/orcamentos`, `/criarOrcamento`)
- UI moderna com Tailwind CSS 4 e tokens de tema/acessibilidade via CSS variables
- Qualidade de código com ESLint + Prettier

## Stack

- React 19
- TypeScript
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- React Hook Form + Zod
- TanStack Query (base para camada de dados assíncrona)
- ESLint + Prettier

## Arquitetura Resumida

```text
src/
  components/
    Dashboard/
    shared/
  pages/
    Dashboard/
    Clients/
    Vehicles/
    Quotes/
    CreateQuote/
  types/              # contratos de tipo compartilhados
  lib/                # utilitários
```

## Experiência Implementada

- Dashboard com métricas e distribuição de serviços
- Gestão de clientes e veículos em fluxo integrado
- Página de orçamentos com informações detalhadas
- Wizard de criação de orçamento com preview em tempo real

## Setup Local

### Requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie o arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3333
```

### Executar em desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

## Scripts

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção (tsc -b + vite build)
npm run preview  # preview local do build
npm run lint     # análise estática
```

## Rotas

- `/dashboard`
- `/clientes`
- `/veiculos`
- `/orcamentos`
- `/criarOrcamento`

`/` redireciona para `/dashboard`.

## Próximos Passos de Evolução

- conectar todas as páginas a endpoints reais
- adicionar testes automatizados (unitários e integração)
- instrumentar telemetria de uso para medir tempo de criação de orçamento
- evoluir controle de permissões por perfil de usuário
