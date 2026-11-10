// Tela de carregamento: o icone da Konelabs com um anel verde girando em volta.
// O mesmo HTML e CSS servem a home (components/PageLoader.tsx) e as propostas, que chegam como HTML
// pronto pelas rotas em app/propostas e recebem a tela injetada logo depois do <body>.
// Some com fade quando a pagina termina de carregar (evento load); se o script nao rodar, some sozinha em 10 s.

const icone = `<svg xmlns="http://www.w3.org/2000/svg" class="kl-carregando-icone" aria-hidden="true" focusable="false" viewBox="62.8 47.8 74.5 103.8"><path fill-rule="evenodd" clip-rule="evenodd" d="M103.174 49.8783C102.649 48.6658 101.429 47.8386 100.067 47.8386C98.7335 47.8386 97.492 48.6469 96.9589 49.8783L63.8665 126.353C63.8361 126.423 63.788 126.538 63.7586 126.609C63.1385 128.131 62.8242 129.704 62.8242 131.287C62.8242 145.844 85.4703 151.585 100.066 151.585C114.664 151.585 137.309 145.843 137.309 131.287C137.309 129.565 136.933 127.887 136.264 126.348L103.174 49.8783Z" fill="#0FDF5C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M137.309 131.287C137.309 129.565 136.933 127.887 136.264 126.348L103.175 49.8783C102.651 48.6658 101.43 47.8386 100.069 47.8386C100.068 47.8386 100.067 47.8386 100.066 47.8386V151.585C114.665 151.585 137.309 145.843 137.309 131.287Z" fill="#21AF56"/><path fill-rule="evenodd" clip-rule="evenodd" d="M74.6121 146.248C67.0107 142.432 62.8242 137.085 62.8242 131.19C62.8242 129.601 63.1387 128.019 63.7586 126.491C63.798 126.395 63.83 126.318 63.8629 126.242C65.8571 121.611 70.5333 117.683 77.389 114.872C83.8954 112.205 91.7371 110.796 100.067 110.796C108.396 110.796 116.238 112.206 122.744 114.872C129.6 117.682 134.276 121.611 136.267 126.235C136.302 126.317 136.337 126.399 136.371 126.482C136.994 128.018 137.309 129.6 137.309 131.19C137.309 137.085 133.122 142.432 125.521 146.248C118.665 149.69 109.625 151.585 100.066 151.585C90.5076 151.585 81.4679 149.69 74.6121 146.248Z" fill="#0DD357"/><path fill-rule="evenodd" clip-rule="evenodd" d="M77.3891 114.872C70.5333 117.682 65.8571 121.611 63.8629 126.242C63.83 126.318 63.798 126.395 63.7586 126.491C63.1385 128.019 62.8242 129.601 62.8242 131.19C62.8242 137.085 67.0107 142.432 74.6122 146.248C81.468 149.69 90.508 151.585 100.067 151.585V110.796C91.7371 110.796 83.8955 112.206 77.3891 114.872Z" fill="#00FF5F"/></svg>`;

export const cssCarregamento = `
.kl-carregando {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E") 0 0 / 200px 200px, #0f0f0f;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  animation: kl-sumir 0.4s ease 10s forwards;
}
.kl-carregando.kl-saindo {
  opacity: 0;
  visibility: hidden;
}
.kl-carregando-marca {
  position: relative;
  width: 88px;
  height: 88px;
  display: grid;
  place-items: center;
}
.kl-carregando-icone {
  width: 30px;
  height: auto;
}
.kl-carregando-anel {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: kl-girar 1s linear infinite;
}
.kl-carregando-anel circle {
  fill: none;
  stroke-width: 3;
}
.kl-carregando-trilho {
  stroke: #2b2b2b;
}
.kl-carregando-arco {
  stroke: #02ff55;
  stroke-linecap: round;
  stroke-dasharray: 64 225;
}
.kl-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@keyframes kl-girar {
  to {
    transform: rotate(360deg);
  }
}
@keyframes kl-sumir {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
@media (prefers-reduced-motion: reduce) {
  .kl-carregando,
  .kl-carregando-anel {
    transition: none;
    animation: none;
  }
}
`;

// Conteudo da tela (icone, anel e texto para leitores de tela).
export const marcaCarregamento = `
<div class="kl-carregando-marca">
  <svg class="kl-carregando-anel" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <circle class="kl-carregando-trilho" cx="50" cy="50" r="46" />
    <circle class="kl-carregando-arco" cx="50" cy="50" r="46" />
  </svg>
  ${icone}
</div>
<span class="kl-sr">Carregando</span>
`;

// Versao completa para paginas em HTML puro (propostas).
export const htmlCarregamento = `
<style>${cssCarregamento}</style>
<div id="kl-carregando" class="kl-carregando" role="status">${marcaCarregamento}</div>
<noscript><style>#kl-carregando{display:none}</style></noscript>
<script>
(function () {
  var tela = document.getElementById("kl-carregando");
  if (!tela) return;
  function sair() {
    tela.classList.add("kl-saindo");
    setTimeout(function () { tela.remove(); }, 450);
  }
  if (document.readyState === "complete") sair();
  else window.addEventListener("load", sair, { once: true });
})();
</script>
`;

// Insere a tela logo depois da abertura do <body> do HTML recebido.
export function comCarregamento(html: string) {
  return html.replace(/<body[^>]*>/i, (abertura) => abertura + htmlCarregamento);
}
