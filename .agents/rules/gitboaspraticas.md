---
trigger: always_on
---

# Regra 04 — Boas Práticas de Git e Versionamento

## Princípio geral

Todo código produzido neste projeto deve ser versionado como um programador profissional: commits atômicos, mensagens descritivas, branches por feature e histórico limpo que qualquer membro do time consiga entender sem pedir explicação.

---

## Estrutura de branches

```
main          →  produção — nunca commitar direto
develop       →  integração — branch base para todas as features
feature/*     →  novas funcionalidades  (ex: feature/t02-hard-stops)
fix/*         →  correções de bug       (ex: fix/car-regex-validation)
chore/*       →  tarefas técnicas       (ex: chore/update-dependencies)
docs/*        →  documentação           (ex: docs/add-api-readme)
```

### Regras de branch

- **Nunca commitar direto em `main` ou `develop`** — sempre abrir uma branch
- Nome da branch em **kebab-case**, prefixado pelo tipo: `feature/`, `fix/`, `chore/`, `docs/`
- Referenciar o ID da tela quando aplicável: `feature/t07-kanban-projetos`
- Branches de feature devem partir de `develop` e fazer merge de volta para `develop`

---

## Conventional Commits

Todo commit deve seguir o padrão **Conventional Commits**:

```
<tipo>(<escopo>): <descrição curta no imperativo>

[corpo opcional — explica o porquê, não o quê]

[rodapé opcional — referências, breaking changes]
```

### Tipos permitidos

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade para o usuário |
| `fix` | Correção de bug |
| `refactor` | Refatoração sem mudança de comportamento |
| `style` | Ajustes de formatação, CSS, sem lógica |
| `test` | Adição ou correção de testes |
| `docs` | Documentação |
| `chore` | Configuração, dependências, CI/CD |
| `perf` | Melhoria de performance |
| `revert` | Reversão de commit anterior |

### Exemplos corretos

```bash
feat(t02): add CAR format validation with HS-03 hard-stop

fix(t07): prevent drag-and-drop from bypassing status enum constraint

refactor(auth): extract RBAC middleware to shared module

chore(deps): upgrade next.js to 14.2.0

docs(api): document POST /projetos endpoint with error codes

style(kanban): align card badges to design system tokens

feat(whatsapp): implement voice mode detection via Whisper transcription

fix(t12): correct benefit distribution chart when janela_financiamento is null
```

### Regras da mensagem de commit

- **Primeira linha:** máximo 72 caracteres, imperativo, sem ponto final
- **Escopo:** nome curto da tela, módulo ou camada (`t02`, `kanban`, `auth`, `db`, `api`)
- **Corpo:** separado por linha em branco — explica *por que* a mudança foi necessária, não o que mudou (o diff já mostra o quê)
- **Nunca** usar mensagens vagas: `fix bug`, `update`, `wip`, `teste`, `ajuste`

---

## Fluxo de trabalho padrão

```bash
# 1. Partir sempre de develop atualizado
git checkout develop
git pull origin develop

# 2. Criar branch para a tarefa
git checkout -b feature/t08-analise-proposta-individual

# 3. Trabalhar em commits atômicos — um commit por mudança lógica
git add src/components/ProposalAnalysis.tsx
git commit -m "feat(t08): render predictive score breakdown by dimension"

git add src/services/proposalService.ts
git commit -m "feat(t08): add approveProposal action with contract schedule creation"

# 4. Antes de abrir PR, sincronizar com develop
git fetch origin
git rebase origin/develop

# 5. Push e abrir Pull Request para develop
git push origin feature/t08-analise-proposta-individual
```

---

## Pull Requests

- **Título do PR:** mesmo formato do commit principal — `feat(t08): implement proposal analysis screen`
- **Descrição obrigatória:**
  - O que foi implementado
  - Telas/módulos afetados (referenciar IDs: T-08, T-07, etc.)
  - Como testar
  - Screenshots ou gravação de tela se houver mudança visual
- **Tamanho:** PRs focados — preferencialmente uma feature ou fix por PR
- **Nunca mergear PR com conflitos sem resolver**
- Squash merge para `develop`; merge commit de `develop` para `main`

---

## O que nunca versionar

Adicionar ao `.gitignore` antes do primeiro commit:

```
.env
.env.local
.env.*.local
node_modules/
.next/
dist/
build/
*.log
.DS_Store
```

> ⚠️ **Nunca commitar credenciais, API keys, tokens ou secrets** — mesmo que seja um commit temporário. Use variáveis de ambiente e, se cometido por engano, revogar a chave imediatamente e usar `git filter-branch` ou `git-filter-repo` para remover do histórico.

---

## Tags de versão

Usar **Semantic Versioning** para releases:

```
v<MAJOR>.<MINOR>.<PATCH>

v0.1.0  →  primeiro MVP funcional (P1 obrigatórios)
v0.2.0  →  telas P2 implementadas
v1.0.0  →  versão de produção pós-hackathon
```

```bash
git tag -a v0.1.0 -m "feat: MVP P1 screens complete for hackathon pitch"
git push origin v0.1.0
```
