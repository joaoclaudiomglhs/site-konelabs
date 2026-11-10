# Regras de UX/UI Konelabs

Documento único com todas as regras de interface, experiência e motion para projetos da Konelabs. Reúne o Guia Konelabs (AI System Guide), as regras de trabalho definidas para o projeto e as decisões tomadas na proposta comercial. Quando houver conflito, vale a ordem de prioridade da seção 16.

## 1. Identidade visual

- Cor primária: #02FF55.
- Cor de fundo: #0F0F0F, usada como base da interface.
- Superfícies e divisores: tons escuros e cinzas neutros.
- Divisores: linhas finas em tons de cinza para separar seções, grupos de informações e conteúdos relacionados.
- Verde: usar exclusivamente em detalhes de destaque, como ícones, pequenos indicadores, bordas pontuais, estados ativos e elementos de ênfase.
- Nunca usar verde como fundo de blocos, cards, seções ou grandes superfícies.
- Não usar cores de destaque em excesso.
- Manter contraste adequado, legibilidade e consistência visual.

### Estética de superfícies

- Menu com blur no fundo: o cabeçalho fixo usa fundo escuro translúcido (#0F0F0F com cerca de 55% de opacidade) e backdrop-filter com blur de 20px. O blur faz parte da estética da Konelabs e deve ser mantido em todo menu fixo, inclusive no menu mobile.
- Noise em todo background, sempre: o fundo da página, o header, os cards, os blocos de logo e os controles levam uma textura de ruído fina e de baixa opacidade (cerca de 5% a 7%). Nenhuma superfície fica lisa. O noise fica atrás do conteúdo, não recebe cliques e nunca prejudica a leitura. No código, use o token `--noise` como primeira camada do `background` de qualquer superfície nova.
- Cards de destaque em cinza mais claro: para destacar um card (por exemplo números, a ação de contato principal ou resultados), usar uma superfície cinza mais clara que a padrão (#212121, com borda #3A3A3A). Cards comuns usam #151515. Usar com moderação: só alguns cards por tela ficam em destaque.

### Tokens compartilhados entre site e proposta comercial

- Fundo #0F0F0F, superfície #151515, superfície 2 #1B1B1B, destaque #212121.
- Linhas #2B2B2B, linha suave #212121, linha forte #3A3A3A.
- Texto #EDEDED, texto de apoio #A3A3A3, texto corrido em blocos #CFCFCF.
- Verde #02FF55, com hover #4DFF82 só no botão principal.
- Raio de 14px em cards, 12px em blocos de logo e mídia, 10px em botões e controles.

## 2. Regras gerais de conteúdo e componentes

- Não comprimir, resumir ou omitir contexto da conversa.
- Não usar emojis. Usar ícones Lucide.
- Não usar o travessão longo (caractere U+2014) em textos de interface, cópia gerada ou documentação.
- Textos concisos, claros e objetivos, em linguagem simples e profissional, adequada ao contexto do projeto.
- Copy direta e específica, em voz ativa, sem frases vagas, sem exclamações desnecessárias e sem linguagem de marketing genérica.
- Mensagens de erro explicam o que aconteceu e o que a pessoa pode fazer.
- Nunca usar Lorem Ipsum em interface final. Usar dados sintéticos realistas quando não houver dados reais. Marcadores explícitos, como "[Nome do cliente]", são aceitos quando o dado real ainda não existe.
- Não inventar regras de negócio, requisitos, APIs, permissões, exigências legais, modelos de dados ou integrações.

## 3. Cards e bordas

- Nunca usar bordas laterais (esquerda ou direita) coloridas ou de destaque em cards arredondados. Para destacar um card, usar ícone, indicador pequeno ou fundo de superfície, sem faixa lateral.
- Card serve para agrupar com significado, hierarquia ou elevação. Não criar card só porque o conteúdo cabe num retângulo.
- Não inserir tags dentro de cards.
- Preferir linhas finas de divisão a caixas quando o conteúdo é uma lista ou uma sequência.

## 4. Títulos e tags

- Títulos H2 não contêm ícones.
- Não posicionar tags ao lado dos títulos.
- Tags, quando usadas, ficam somente antes dos títulos H2, sem ícones decorativos e sem substituir a hierarquia.
- Na proposta comercial, por decisão do cliente, as tags acima dos títulos foram removidas. Nesse projeto, não usar tags.
- No site, as tags continuam antes dos H2, no estilo de tag da proposta: pílula com borda #2B2B2B, ponto verde e texto em Space Mono 12px, caixa alta, cinza.
- Usar capitalização de frase por padrão e evitar texto todo em caixa alta, exceto rótulos pequenos de apoio.

### Sem numeração de itens

- Nunca enumerar tópicos de nenhuma forma: nada de 01, 02, 03, 1., 2., (a), (b) ou contadores em listas, menus, serviços, setores, etapas, cards ou índices.
- Para dar ritmo ou identidade a uma lista, usar ícone Lucide, ilustração, divisores finos ou hierarquia tipográfica, nunca número de ordem.
- Listas ordenadas em HTML (ol) só quando a ordem for essencial para a tarefa, e mesmo assim sem exibir o número.
- Números continuam permitidos quando são dado real (anos, prazos, quantidades, preços, resultados).

## 5. Ícones

- Usar exclusivamente ícones da biblioteca Lucide.
- Ícones com presença visual e grandes o suficiente para reconhecimento e hierarquia, em especial em cards, ações principais, indicadores e áreas de destaque. Ajustar ao contexto para não prejudicar a leitura.
- Manter consistência de tamanho, traço, alinhamento e comportamento.
- Sempre que fizer sentido, usar ícones animados, de forma sutil, fluida e funcional, comunicando estado, ação ou feedback.
- Evitar animações contínuas sem propósito.
- Não usar ícone só como decoração quando ele cria ruído.
- Em botões, o ícone acompanha o movimento do botão no hover, sem se deslocar no sentido contrário.

## 6. Hover, foco e estados de interação

- Estados de hover nunca usam transformação de escala (scale), nem em foco ou estado pressionado.
- Exceção: imagens de capa dentro de cards de projeto podem ter um zoom suave (até 4%) no hover e no foco do card. A imagem cresce dentro da própria moldura, que corta o excesso, então o card, o texto e os botões não mudam de tamanho. Animar com mola amortecida, sem oscilar, e desligar com prefers-reduced-motion.
- Cards de projeto não têm seta: o hover e o foco mostram uma borda verde na moldura da capa, junto com o zoom da imagem.
- Perguntas frequentes abrem e fecham com altura animada em mola e opacidade; só o sinal de mais gira, a moldura do ícone fica parada.
- Usar deslocamento (translate), cor, fundo, borda ou sombra.
- Manter estados claros: padrão, hover, foco, ativo, pressionado, desabilitado, carregando, sucesso, erro, vazio e selecionado, quando aplicáveis.
- Foco sempre visível.
- Botão principal evidente. Ações secundárias não competem com um botão preenchido: usar links, ações terciárias ou controles mais discretos.
- Botões no padrão da proposta: cantos de 10px, fundo de superfície, borda #2B2B2B e ícone verde. No hover, borda verde e subida de 2px com mola.
- Botão principal: verde preenchido com texto #0F0F0F, só na ação mais importante da tela (no site, falar no WhatsApp). O botão do menu usa o estilo padrão.
- Cards interativos sobem 3px com mola no hover e clareiam a borda. Ícones de card ficam em verde, sem caixa em volta.
- Evitar modal para toda interação. Preferir edição em linha, seções expansivas ou painéis contextuais quando preservarem melhor o fluxo.

## 7. UI/UX e composição

- Interfaces simples, objetivas, limpas e fáceis de usar.
- Priorizar usabilidade e clareza em vez de decoração.
- Usar elementos gráficos para reforçar a identidade visual e enriquecer a composição, sem prejudicar uso, leitura ou compreensão.
- Manter hierarquia visual, espaçamento, alinhamento e consistência.
- Layouts equilibrados, sem complexidade visual desnecessária.
- Linhas horizontais finas em cinza para dividir conteúdos.
- Divulgação progressiva em vez de mostrar tudo de uma vez.
- Tornar o status do sistema visível quando uma ação demora ou muda estado.
- Navegação previsível, com a localização atual clara e um caminho de volta quando houver fluxo.
- Projetar para a tarefa real da pessoa, não só para a composição visual.

## 8. Layout e responsividade

- Preferir contêineres de conteúdo com largura limitada a conteúdo solto em largura total.
- Grid CSS para layouts bidimensionais complexos. Flexbox para alinhamento unidimensional.
- Evitar cálculos frágeis com porcentagem.
- Preferir min-height: 100dvh a height: 100vh em seções de tela cheia.
- Projetar o comportamento responsivo de forma intencional, não só encolhendo o desktop. Verificar larguras intermediárias.
- Não forçar alturas iguais quando o conteúdo varia.
- Usar alinhamento óptico quando o alinhamento matemático parecer errado.
- Manter ritmo vertical consistente. Valores numéricos são ponto de partida e se adaptam ao sistema de design e ao conteúdo.

Mobile (até 1000 px):
- Índice lateral vira um botão flutuante no canto inferior esquerdo, com painel de tópicos que abre acima dele. Fecha ao escolher um tópico, ao tocar fora e com Esc. O botão usa aria-expanded e aria-controls, e o item da seção atual fica destacado.
- Dar espaço no rodapé da página para o botão flutuante não cobrir o conteúdo final.
- Tabela que não cabe na largura da tela rola dentro do próprio bloco e indica isso: aviso "Deslize para o lado" com ícone, e degradê nas bordas onde há mais conteúdo. O aviso só aparece quando há rolagem, e o bloco tem foco por teclado e nome acessível.
- Sem rolagem horizontal na página: botões de ação em largura total, tabelas largas com rolagem própria, grids em uma coluna e margens laterais de 16 px.

Imagens, cronogramas e resultados:
- Imagens de prévia de sites ou projetos nunca são cortadas: mostrar inteiras, na proporção original.
- Cronograma é uma linha do tempo vertical, com marcos de aprovação e o prazo total do projeto em destaque no topo e no fim.
- Cada resultado de case traz um ícone Lucide próprio ao lado do valor.

## 9. Tipografia

- Preservar a tipografia existente do projeto, a menos que ela faça parte do pedido. Em projetos novos da Konelabs, seguir a fonte padrão abaixo.
- Hierarquia clara entre display, título, corpo, rótulo e texto de apoio.
- Usar pesos variados, não só regular e negrito.
- Texto longo em largura de leitura confortável, com entrelinha e espaçamento adequados.
- Números tabulares em interfaces com muitos dados.
- Usar text-wrap: balance ou pretty quando houver suporte e utilidade.
- Não trocar fontes só para parecer diferente.
- Fonte padrão da Konelabs: Inter, para títulos, textos, botões e demais elementos de interface.
- Space Mono para detalhes: rótulos pequenos, metadados, números de apoio, códigos e legendas técnicas. Não usar Space Mono em texto corrido nem em títulos.
- Em documentos Word, usar Inter quando instalada. Sem ela, o Word troca por uma fonte do sistema.
- Títulos em Inter peso 600, espaçamento de letras entre -0,01em e -0,02em e entrelinha de 1,1 a 1,2. Corpo com entrelinha de 1,65.
- Rótulos em Space Mono: 12px, caixa alta, espaçamento de letras 0,04em, cor #A3A3A3. Usar em metadados (cliente, ano, setor), títulos de listas (aplicações, setores) e nomes de canais de contato. Números de sequência em Space Mono 700, verde.
- No site, as fontes vêm dos pacotes @fontsource-variable/inter e @fontsource/space-mono, sem depender de serviço externo.

## 10. Motion e animações

- Motion é opcional. Usar quando melhora entendimento espacial, hierarquia, feedback, continuidade ou resposta percebida.
- Smooth scroll: rolagem suave com inércia quando apropriado, desacoplando do padrão do navegador somente com benefício claro. Evitar efeitos excessivos.
- Entrada escalonada: animar elementos em sequência, com pequenos intervalos entre elementos relacionados, combinando deslocamento sutil no eixo Y com opacidade. Nunca animar tudo ao mesmo tempo.
- Física de mola em elementos interativos, para interações naturais e contínuas. Evitar transições mecânicas ou rígidas e manter o comportamento consistente em toda a interface.
- Preferir animar opacidade, transform, cor, fundo e sombra. Evitar animar propriedades de layout como top, left, width e height.
- Respeitar prefers-reduced-motion.
- Não adicionar movimento só para impressionar.
- Entrada escalonada com deslocamento de 16px em Y e intervalo de cerca de 70 ms entre itens, igual nas duas peças.
- Implementação no site: Framer Motion (pacote motion, importado de motion/react). Usar LazyMotion com domAnimation e componentes m.* para enviar menos JavaScript. As molas ficam centralizadas em lib/motion.ts (entrada, hover e interface) para manter o mesmo comportamento em toda a interface. MotionConfig com reducedMotion="user" desliga deslocamentos e zoom para quem prefere menos movimento.
- Entradas animam uma única vez, quando o elemento entra na tela. Elementos que aparecem e somem (como o menu mobile) usam AnimatePresence, com saída mais curta que a entrada.

## 11. Acessibilidade

- Navegação por teclado em todos os controles.
- HTML semântico sempre que possível (header, nav, main, section, article, aside, footer, button, a, form, label).
- Nomes acessíveis em controles interativos e rótulos associados aos campos.
- Texto alternativo útil em imagens com significado.
- Contraste suficiente. Não usar só a cor para comunicar estado.
- Áreas de interação adequadas.
- Nunca comprometer acessibilidade por aparência.

## 12. Estados de produto, desenvolvimento e escopo

Estados a verificar, quando aplicáveis: carregando, vazio, erro, sucesso, desabilitado, validação, sem resultados, indisponível ou sem permissão, navegação de volta e não encontrado. Não criar estados que dependam de regra de negócio inventada.

Desenvolvimento:
- Trabalhar estritamente com a stack existente. Não migrar frameworks nem trocar bibliotecas de estilo.
- Preservar a arquitetura e as funcionalidades existentes. Testar após cada alteração relevante.
- Antes de importar uma biblioteca, inspecionar o arquivo de dependências. Priorizar o que já existe e não adicionar dependência quando os recursos atuais resolvem.
- Tailwind: verificar a versão instalada (v3 ou v4) e não misturar padrões entre versões.
- Projeto sem framework: usar CSS padrão e não introduzir framework só para mudanças visuais.
- Alterações pequenas, focadas e fáceis de revisar. Sem refatoração desnecessária. Reutilizar componentes, tokens e utilitários existentes.
- Não declarar que algo foi testado se não foi.
- Em redesign: preservar funcionalidades, rotas, integrações e convenções que funcionam, e melhorar hierarquia, usabilidade, espaçamento, consistência, responsividade, acessibilidade e feedback.

## 15. Ilustrações com animação suave

Aplicam-se a ilustrações de apoio em cards e seções (como as do Branding book e do Guia para execução + IA) e às ilustrações 3D dos serviços no site.

No site, cada serviço tem uma ilustração isométrica (3D) em SVG, sem biblioteca, no lugar do ícone: base em placa, volumes com topo mais claro e laterais mais escuras, cinzas da marca e verde em um ou dois detalhes. A mini animação usa flutuação de até 4px, pulso de opacidade no detalhe verde, cursor piscando ou linha tracejada em fluxo, com ciclos defasados. Com prefers-reduced-motion a ilustração fica em repouso.

Estilo:
- Estilo editorial plano, no espírito do Airbnb: formas arredondadas, poucos detalhes e composição clara. Sem contornos finos, gradientes pesados ou sombras realistas.
- Paleta restrita ao sistema: cinzas da marca (#0F0F0F, #1B1B1B, #2B2B2B, #3A3A3A, #6B6B6B, #EDEDED) e verde #02FF55 apenas em pequenos detalhes (um ponto, um botão, um marcador). Nunca em áreas grandes.
- Uma ideia por ilustração, com no máximo 4 elementos principais. Ler da esquerda para a direita quando houver fluxo (origem, processo, resultado).
- Elementos de interface devem ser fiéis ao que representam (janela com barra de título e nome do arquivo, lista com marcadores, botão em pílula), nunca blocos genéricos.
- Sem emojis, personagens de terceiros, marcas ou textos longos. Texto dentro da ilustração só em fonte Inter ou Space Mono e no máximo uma palavra ou rótulo curto.
- Viewbox padrão 400x240 (ilustração de hero: 400x300), raio de cantos entre 8 e 18, traços de 2 a 3 px, linha de chão com elipse #1B1B1B.
- SVG inline, com role="img" e aria-label descritivo. Entregar também como arquivo .svg avulso.

Movimento:
- Animações lentas, contínuas e discretas, só com transform e opacity: flutuar (translateY de 4 a 5 px, ciclo de 5 a 7 s, ease-in-out), pulsar um ponto verde (opacity de 1 a 0,35, 3 s) e fluxo tracejado (stroke-dashoffset, 1,6 s linear).
- Defasar os ciclos (animation-delay negativo) para que os elementos não se movam em sincronia.
- Não usar rotate dentro de keyframes em grupos posicionados com transform no SVG, pois desloca o elemento. Posicionar com um grupo externo e animar o interno.
- Sem escala, sem giros e sem movimento maior que 6 px.
- Respeitar prefers-reduced-motion: desligar todas as animações da ilustração.
- Nas versões estáticas (PDF e Word), usar a ilustração em repouso, ou omiti-la quando o formato não suportar SVG.

### 15.1 Ilustrações narrativas (hero com livros, interfaces e pessoas)

Exceção à regra de 4 elementos: o hero pode contar uma história completa (origem, processo, resultado), desde que mantenha uma leitura única e limpa.

Composição:
- Ler da esquerda para a direita: origem (livros de marca), fluxo (linhas pontilhadas) e resultados (interfaces como navegador, post e slide). Pessoas ficam nas pontas, voltadas para o centro.
- Livros sempre em par, lado a lado, sobrepostos e levemente angulados em sentidos opostos (cerca de 9 graus), com a logo real do cliente na capa. Cada marca pode ter sua cor de capa e de detalhe, mas a ilustração continua ancorada na paleta cinza do sistema.
- Ordem de camadas, de trás para frente: chão (elipse #1B1B1B), linhas pontilhadas, livros, cards de interface, pessoas. As linhas ficam sempre atrás dos livros e dos cards, nunca por cima.
- Cards de interface com a mesma anatomia das telas reais (barra com três pontos, linhas de texto em pílula, botão em pílula) e raio de 8 a 18. Ícones de apoio (usuário, robô) em card quadrado pequeno, no mesmo traço e escala dos ícones do sistema.
- Pessoas em formas simples (cabeça esférica, corpo em cápsula, braços em cápsula) em cinzas do sistema, sem rosto detalhado. Uma pessoa por livro, interagindo com ele.
- Reduzir o espaço vazio entre a ilustração e o conteúdo vizinho. No desktop fica ao lado do título (coluna de cerca de 410 px); no mobile fica acima do título, em largura total até 480 px.

Linhas pontilhadas (fluxo):
- Pontos pequenos e bem espaçados (traço de 2,5 px, intervalo maior que o ponto), sem linha contínua, em cinza #6B6B6B.
- Curvas suaves partindo do livro e chegando por baixo do card, sem cruzar outras linhas quando possível.
- A linha é desenhada com easing do início ao fim ao abrir o livro e recolhe ao fechar.
- Apenas um ponto de energia percorre cada linha, na cor da marca do livro (ou verde #02FF55 quando a ilustração não é de uma marca). Sem rastro, sem anel e sem explosão de partículas na chegada.

Sequência e animação:
- Contar em ordem: livro abre, pessoa interage, linhas se desenham, cards surgem um a um com defasagem de 0,3 a 0,5 s.
- Abrir e fechar objetos usa easing (ease in-out cúbico), duração de 0,8 a 1,0 s, sem bounce e sem mola. O fechamento pode soltar um pequeno efeito de poeira discreto.
- Entrada de cards só com translate e opacity, saindo do livro. Sem escala e sem giro.
- Flutuação contínua dos cards de no máximo 5 px, defasada entre elementos.
- Em loop automático, começar assim que a página carrega, alternar entre as marcas e pausar por 5 s após qualquer interação do usuário antes de retomar.
- Com prefers-reduced-motion, não animar sozinha: mostrar em repouso e animar apenas por ação do usuário.
- Entregar sempre uma versão estática (SVG em repouso) como reserva para quando WebGL ou animação não estiverem disponíveis, e para PDF e Word.

## 16. Ordem de prioridade

1. Preservar as funcionalidades existentes.
2. Respeitar a stack tecnológica e a arquitetura do projeto.
3. Corrigir o problema solicitado.
4. Manter usabilidade e acessibilidade.
5. Seguir as diretrizes de UI/UX.
6. Aplicar melhorias visuais e de motion.
7. Manter a implementação mínima, focada e fácil de revisar.

## 17. Checklist antes de entregar

- O comportamento pedido funciona e o que já existia continua funcionando.
- Importações e dependências existem e resolvem.
- Layout coerente, espaçamento consistente, hierarquia clara e responsividade intencional.
- Estados de interação presentes onde necessário, sem escala no hover (exceto o zoom da imagem dentro da capa dos cards de projeto).
- Teclado, foco visível, nomes acessíveis, rótulos e contraste verificados.
- Sem emojis, sem travessão longo, sem bordas laterais em cards arredondados, sem verde em grandes áreas.
- Resultado de validação informado com honestidade.
- Menu com blur no fundo, noise em todas as superfícies e cards de destaque em cinza mais claro.
- Site e proposta comercial com os mesmos tokens, fontes (Inter e Space Mono), botões e cards.
- Nenhum item enumerado em listas, menus, serviços, setores ou etapas.
