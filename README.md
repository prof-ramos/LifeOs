# LifeOS

Dashboard pessoal modular para **saúde (treino, alimentação e sono)**, **tarefas pessoais** e **estudos**. Evolução incremental: funcionalidades só serão adicionadas quando houver uma necessidade concreta.

## Estado atual

- Interface única e responsiva, com visão geral e navegação por módulos.
- Módulo de tarefas: adicionar, mover entre A fazer / Em andamento / Concluído e excluir cartões.
- Persistência **somente no localStorage do navegador**. O protótipo não dispõe de login, sincronização, banco de dados, backup nem integração com serviços externos.
- Saúde e estudos são páginas de preparação; não coletam nem exibem métricas fictícias.

**Privacidade:** o repositório é público e a aplicação ainda não tem autenticação. Não use esta versão para armazenar dados sensíveis. Os cartões ficam no dispositivo/navegador onde foram registrados e podem ser perdidos ao limpar os dados do site.

## Stack e origem

- Next.js (App Router), React, TypeScript, Tailwind CSS e Vercel.
- Layout e componentes derivados/adaptados da edição [Next.js do Shadcn Dashboard](https://github.com/shadcndashboard/next-shadcn-dashboard). Atribuição preservada em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) e no rodapé da aplicação.
- Quadro de tarefas desenvolvido para o LifeOS, inspirado na experiência Kanban do [Kan](https://github.com/kanbn/kan). Nenhum código do Kan foi incorporado.
- [WebMCP](https://github.com/webmachinelearning/webmcp), [AgentMail Plugins](https://github.com/agentmail-to/agentmail-plugins) e [OptMem](https://github.com/VictorTaelin/OptMem) são possibilidades futuras, **não estão integrados**.

## Executar localmente

Pré-requisito: Node.js >= 20.9.

```bash
npm install
npm run dev
```

Abra http://localhost:3000 . Verificação estática e compilação:

```bash
npm run typecheck
npm run build
```

## Deploy na Vercel

Importe `prof-ramos/LifeOs` como um projeto Next.js na Vercel. O primeiro deploy será um **protótipo público sem autenticação**, não um produto de gestão de dados pessoais. Antes de habilitar persistência remota e conectar informações de saúde ou estudo, implemente autenticação, autorização por usuário e armazenamento persistente com backup.

## Arquitetura incremental

```text
app/                 Rotas e páginas do dashboard
components/          Shell, cards e interfaces compartilhadas
modules/tasks/       Tipos e repositório local para tarefas
```

A camada `modules/tasks/local-repository.ts` isola o armazenamento do módulo de tarefas. Uma futura integração com uma instância do Kan deverá ser feita por um adaptador **no servidor**, com credenciais protegidas e sem duplicar estados ou expor tokens ao navegador. Não há serviço Kan necessário nesta versão.

## Próximos marcos (não implementados)

1. Autenticação e persistência segura antes de registrar dados pessoais reais.
2. Escolher a fonte de verdade para tarefas (banco próprio ou integração Kan).
3. Incorporar, conforme necessidade, saúde, estudos e WebMCP com autorização explícita.
