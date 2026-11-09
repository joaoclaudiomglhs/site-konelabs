# Regras de UX/UI Konelabs

Documento único com todas as regras de interface, experiência e motion para projetos da Konelabs. Reúne o Guia Konelabs (AI System Guide), as regras de trabalho definidas para o projeto e as decisões tomadas na proposta comercial. Quando houver conflito, vale a ordem de prioridade da seção 13.

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
- Noise suave no fundo principal: uma textura de ruído fina e de baixa opacidade (cerca de 5%) cobre o fundo #0F0F0F. Fica atrás do conteúdo, não recebe cliques e nunca prejudica a leitura.
- Cards de destaque em cinza mais claro: para destacar um card (por exemplo números, a ação de contato principal ou resultados), usar uma superfície cinza mais clara que a padrão (#212121, com borda #3A3A3A). Cards comuns usam #161616. Usar com moderação: só alguns cards por tela ficam em destaque.

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
- Usar capitalização de frase por padrão e evitar texto todo em caixa alta, exceto rótulos pequenos de apoio.

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
- Usar deslocamento (translate), cor, fundo, borda ou sombra.
- Manter estados claros: padrão, hover, foco, ativo, pressionado, desabilitado, carregando, sucesso, erro, vazio e selecionado, quando aplicáveis.
- Foco sempre visível.
- Botão principal evidente. Ações secundárias não competem com um botão preenchido: usar links, ações terciárias ou controles mais discretos.
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

## 10. Motion e animações

- Motion é opcional. Usar quando melhora entendimento espacial, hierarquia, feedback, continuidade ou resposta percebida.
- Smooth scroll: rolagem suave com inércia quando apropriado, desacoplando do padrão do navegador somente com benefício claro. Evitar efeitos excessivos.
- Entrada escalonada: animar elementos em sequência, com pequenos intervalos entre elementos relacionados, combinando deslocamento sutil no eixo Y com opacidade. Nunca animar tudo ao mesmo tempo.
- Física de mola em elementos interativos, para interações naturais e contínuas. Evitar transições mecânicas ou rígidas e manter o comportamento consistente em toda a interface.
- Preferir animar opacidade, transform, cor, fundo e sombra. Evitar animar propriedades de layout como top, left, width e height.
- Respeitar prefers-reduced-motion.
- Não adicionar movimento só para impressionar.

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

## 13. Ordem de prioridade

1. Preservar as funcionalidades existentes.
2. Respeitar a stack tecnológica e a arquitetura do projeto.
3. Corrigir o problema solicitado.
4. Manter usabilidade e acessibilidade.
5. Seguir as diretrizes de UI/UX.
6. Aplicar melhorias visuais e de motion.
7. Manter a implementação mínima, focada e fácil de revisar.

## 14. Checklist antes de entregar

- O comportamento pedido funciona e o que já existia continua funcionando.
- Importações e dependências existem e resolvem.
- Layout coerente, espaçamento consistente, hierarquia clara e responsividade intencional.
- Estados de interação presentes onde necessário, sem escala no hover.
- Teclado, foco visível, nomes acessíveis, rótulos e contraste verificados.
- Sem emojis, sem travessão longo, sem bordas laterais em cards arredondados, sem verde em grandes áreas.
- Menu com blur no fundo, noise suave no fundo principal e cards de destaque em cinza mais claro.
- Resultado de validação informado com honestidade.
