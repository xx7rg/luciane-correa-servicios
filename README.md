<div align="center">

<img src="docs/images/x7rg.png" alt="x7rG ENTERPRISE" width="260" />

# Luciane Correa Servicios

<img src="docs/images/project.png" alt="Luciane Correa Servicios — apresentação do projeto" width="640" />

**Site de apresentação de serviços de limpeza e cuidados com o lar, com contato pelo WhatsApp.**

![plataforma](https://img.shields.io/badge/plataforma-Web-2E8B57)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript&logoColor=white)
![versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-8A2BE2)

Publicado por **x7rG ENTERPRISE™**

</div>

---

## Sobre o projeto

Site em espanhol para apresentar os serviços de Luciane Correa, incluindo limpeza de casas e portais, passadoria e pacotes de atendimento. Reúne apresentação profissional, opções de serviços, depoimentos e contato pelo WhatsApp.

## Tecnologias

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Cloudflare Pages Functions e KV.

## Executar localmente

Requer Node.js 20.19+ ou 22.12+ e pnpm 10.

```bash
pnpm install
pnpm dev
```

| Comando | Função |
| --- | --- |
| `pnpm dev` | Inicia a interface em desenvolvimento. |
| `pnpm build` | Gera o frontend e o servidor Express em `dist/`. |
| `pnpm check` | Verifica os tipos TypeScript. |
| `pnpm pages:dev` | Executa a prévia local com Cloudflare Pages. |
| `pnpm pages:deploy` | Gera e publica o frontend no Cloudflare Pages. |

### Configuração das funções

As funções de depoimentos e visitas usam os bindings `TESTIMONIALS_KV` e `VISITS_KV`. A administração de depoimentos usa `ADMIN_PASSWORD`. Configure os recursos no Cloudflare e as variáveis locais em `.dev.vars`, que permanece fora do Git. A prévia simples do Vite não executa essas funções.

## Estrutura

- `client/`: interface e imagens públicas.
- `functions/api/`: funções de depoimentos e visitas.
- `server/`: servidor Express.
- `wrangler.toml`: configuração do Cloudflare Pages.

---

<div align="center">

**© 2026 x7rG ENTERPRISE™** — Todos os direitos reservados.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rgds)
&nbsp;
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/_7ragnar/)

</div>
