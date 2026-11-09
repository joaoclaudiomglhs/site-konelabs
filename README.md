# Site Konelabs

Next.js 16 (App Router) + React 19, CSS próprio com os tokens do Guia Konelabs, ícones Lucide, Motion para entradas escalonadas com mola e Lenis para rolagem suave.

## Rodar

    npm install
    npm run imagens   # baixa as capas dos projetos do site atual para public/
    npm run dev       # http://localhost:3000

Build de produção: `npm run build` e `npm start`.

## Onde editar

- Todo o texto: `content/site.ts`
- Cores, espaçamentos e estilos: `app/globals.css` (tokens no topo)
- Logos de clientes: salve em `public/clientes/` com o nome indicado em `content/site.ts`. Enquanto o arquivo não existir, aparece o nome em texto.
- Capas: `public/capas/`. Sem o arquivo, aparece um placeholder com o nome do projeto.

## Pendências de conteúdo

Veja `inventario/inventario-site-atual.md`, seção 6.
