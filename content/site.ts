// Fonte unica de conteudo do site. Edite os textos aqui.
// Regras: sem emojis, sem travessao longo, frases curtas e diretas.

export const contato = {
  pessoa: "João Cláudio Magalhães",
  // Telefone do site atual. A proposta comercial usa (61) 98225-6762: confirmar qual e o correto.
  telefone: "+55 (61) 98225-7872",
  whatsapp: "https://wa.me/5561982257872",
  email: "joao.magalhaes@konelabs.com.br",
  site: "https://joaoclaudiomagalhaes.com/",
};

export const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
];

// Rodape: todas as paginas proprias, para navegacao e rastreamento.
export const navRodape = [...nav, { href: "/contato", label: "Contato" }];

export const hero = {
  // As palavras em "destaques" aparecem em verde dentro do titulo.
  titulo: "Estratégia, design e tecnologia que geram confiança e crescimento.",
  destaques: ["Estratégia", "confiança", "crescimento"],
  apoio:
    "Do primeiro clique ao fechamento, criamos sites, sistemas e produtos digitais que fazem sua marca vender.",
};

export type Servico = {
  id: string;
  titulo: string;
  texto: string;
  aplicacoes: string[];
  icone: "monitor-smartphone" | "compass" | "layers" | "code" | "users";
};

// Numeracao de 01 a 05 depois de remover a duplicata de "Criacao e evolucao de produtos digitais".
// "Branding de marca" ficou de fora ate o Joca confirmar se e um servico separado.
export const servicos: Servico[] = [
  {
    id: "01",
    titulo: "Web design e desenvolvimento",
    texto:
      "Quando seu site não comunica bem ou não gera resultado, criamos experiências digitais que ajudam o usuário a entender, confiar e avançar na decisão, conectando estrutura, conteúdo e tecnologia ao objetivo do negócio.",
    aplicacoes: ["Sites institucionais", "Landing pages", "One pages", "E-commerce", "Blogs e portais", "Hotsites"],
    icone: "monitor-smartphone",
  },
  {
    id: "02",
    titulo: "Estratégia e estrutura de produto",
    texto:
      "Quando falta clareza sobre o que fazer ou por onde começar, estruturamos o produto, organizamos a arquitetura e definimos prioridades para evitar retrabalho e direcionar o investimento com mais segurança.",
    aplicacoes: ["Novos produtos", "Redesign", "Diagnóstico de produto", "Evolução de produto"],
    icone: "compass",
  },
  {
    id: "03",
    titulo: "Criação e evolução de produtos digitais",
    texto:
      "Quando seu produto já existe mas não performa como poderia, criamos e evoluímos experiências com foco em usabilidade, clareza e resultado, alinhando o que o usuário precisa com o que o negócio exige.",
    aplicacoes: ["SaaS", "Aplicativos", "Plataformas", "Sistemas internos", "Interfaces de autocompra", "Totens"],
    icone: "layers",
  },
  {
    id: "04",
    titulo: "Desenvolvimento front-end",
    texto:
      "Quando o design precisa virar um produto real sem perder qualidade, implementamos com código estruturado, garantindo fidelidade, performance e consistência em diferentes cenários.",
    aplicacoes: ["Sites institucionais", "Landing pages", "One pages", "E-commerce", "Blogs e portais", "Hotsites"],
    icone: "code",
  },
  {
    id: "05",
    titulo: "Consultoria e evolução de times",
    texto:
      "Quando seu time precisa evoluir com mais direção e qualidade, atuamos de forma prática e estratégica para melhorar decisões, processos e entregas no dia a dia.",
    aplicacoes: ["Mentoria", "Diagnóstico de interfaces", "Otimização de interfaces", "DesignOps", "Formação de time", "Evolução de times"],
    icone: "users",
  },
];

export type Projeto = {
  slug: string;
  nome: string;
  ano: number;
  categoria: string;
  descricao: string;
  setor: string;
  url: string;
  capa: string;
  // Campos do case completo. Onde ainda nao ha informacao, o campo fica vazio
  // e a pagina mostra o bloco sinalizado como pendente.
  video?: string;
  entregas: string[];
  ferramentas: string[];
  desafio?: string;
  solucao?: string;
  resultados?: { valor: string; rotulo: string }[];
  depoimento?: { texto: string; autor: string; cargo: string };
};

// Descricoes traduzidas do site atual (em ingles).
export const projetos: Projeto[] = [
  {
    slug: "aranet-play",
    nome: "Aranet Play",
    ano: 2025,
    categoria: "Site em Framer",
    setor: "Telecomunicações",
    descricao:
      "Internet por fibra óptica para residências, empresas e provedores, líder no mercado do Norte e Nordeste do Brasil.",
    url: "https://aranetplay.com.br/",
    capa: "/capas/aranet-play.png",
    entregas: ["Design do site", "Desenvolvimento em Framer"],
    ferramentas: ["Framer"],
  },
  {
    slug: "grupo-santa",
    nome: "Grupo Santa",
    ano: 2025,
    categoria: "Site em Framer",
    setor: "Saúde",
    descricao:
      "Um dos maiores grupos privados de saúde do Centro-Oeste, com mais de 10 hospitais e mais de 1 milhão de pacientes atendidos por ano.",
    url: "https://gruposanta.com.br/",
    capa: "/capas/grupo-santa.png",
    entregas: ["Design do site", "Desenvolvimento em Framer"],
    ferramentas: ["Framer"],
  },
  {
    slug: "brasimpex",
    nome: "Brasimpex",
    ano: 2025,
    categoria: "Site em Framer",
    setor: "Segurança",
    descricao:
      "Fundada na França, é uma das maiores representantes de empresas de segurança no Brasil, com equipamentos para áreas militares, indústria e esporte.",
    // O site atual aponta para brasimpex.framer.website; a faixa de clientes usa o dominio oficial.
    url: "https://www.brasimpex.com.br/",
    capa: "/capas/brasimpex.png",
    entregas: ["Design do site", "Desenvolvimento em Framer"],
    ferramentas: ["Framer"],
  },
  {
    slug: "abramar",
    nome: "Abramar",
    ano: 2024,
    categoria: "Site em Framer e branding",
    setor: "Sustentabilidade",
    descricao:
      "Uma das primeiras associações de manufatura reversa do mundo, que trabalha pelo reconhecimento da cadeia formal de reciclagem de eletrônicos como um segmento econômico próspero e sustentável.",
    url: "https://abramar.org/",
    capa: "/capas/abramar.png",
    video: "/videos/abramar.mp4",
    entregas: ["Branding", "Design do site", "Desenvolvimento em Framer"],
    ferramentas: ["Framer"],
  },
  {
    slug: "invisual",
    nome: "Invisual",
    ano: 2024,
    categoria: "Site em Framer",
    setor: "Health tech",
    descricao:
      "Health tech focada em gestão de saúde, que leva inovação e eficiência para redes hospitalares privadas no Brasil.",
    url: "https://www.invisual.com.br/",
    capa: "/capas/invisual.png",
    entregas: ["Design do site", "Desenvolvimento em Framer"],
    ferramentas: ["Framer"],
  },
  {
    slug: "autoinsp",
    nome: "Autoinsp",
    ano: 2024,
    categoria: "Site em Framer",
    setor: "Automotivo",
    // O site atual nao tem descricao para este projeto. Texto pendente.
    descricao: "Descrição do projeto pendente.",
    url: "https://autoinsp.framer.website/",
    capa: "/capas/autoinsp.png",
    entregas: ["Design do site", "Desenvolvimento em Framer"],
    ferramentas: ["Framer"],
  },
];

// Logos dos clientes (pasta "Logo de clientes"). O card mostra somente a imagem.
// url e opcional: quando existir, a logo vira link para o site do cliente.
export const clientes: { nome: string; logo: string; url?: string }[] = [
  { nome: "Grupo Santa", logo: "/clientes/grupo-santa.svg", url: "https://gruposanta.com.br/" },
  { nome: "Hospital Santa Lúcia", logo: "/clientes/hospital-santa-lucia.svg" },
  { nome: "Invisual", logo: "/clientes/invisual.svg", url: "https://www.invisual.com.br/" },
  { nome: "Aranet Play", logo: "/clientes/aranet-play.svg", url: "https://aranetplay.com.br/" },
  { nome: "63 Telecom", logo: "/clientes/63-telecom.svg" },
  { nome: "Brasimpex", logo: "/clientes/brasimpex.svg", url: "https://www.brasimpex.com.br/" },
  { nome: "Grupo BGS", logo: "/clientes/grupo-bgs.png" },
  { nome: "Abramar", logo: "/clientes/abramar.svg", url: "https://abramar.org/" },
  { nome: "Gaia Green Tech", logo: "/clientes/gaia.svg", url: "https://gaiagreentech.com/" },
  { nome: "Simbiótica", logo: "/clientes/simbiotica.svg" },
  { nome: "Instituto Banda Sinfônica de Brasília", logo: "/clientes/banda-sinfonica.svg" },
  { nome: "Bauss", logo: "/clientes/bauss.webp" },
  { nome: "Autoinsp", logo: "/clientes/autoinsp.png" },
];

export const sobre = {
  titulo: "Sua visão, nosso design, seu resultado",
  texto:
    "Criamos soluções para marcas que lideram o seu mercado, unindo design, tecnologia e inovação. Atuamos com transformação digital potencializada com IA, com clientes em todo o Brasil.",
  numeros: [
    // icone: nome do icone Lucide mostrado acima do numero (mapeado em components/Sections.tsx).
    { valor: "+8 anos", rotulo: "de história, desde 2018", icone: "calendar-clock" },
    { valor: "Brasil", rotulo: "clientes em todo o país", icone: "map-pin" },
    { valor: String(projetos.length), rotulo: "projetos em destaque", icone: "layout-grid" },
  ],
  // icone: nome do icone Lucide do setor (mapeado em components/Sections.tsx).
  setores: [
    { nome: "Saúde", icone: "heart-pulse" },
    { nome: "Finanças e fintechs", icone: "landmark" },
    { nome: "Logística e comércio exterior", icone: "ship" },
    { nome: "Varejo e e-commerce", icone: "shopping-bag" },
    { nome: "Indústria", icone: "factory" },
    { nome: "Tecnologia e serviços", icone: "cpu" },
  ],
};

export const faq = {
  titulo: "Antes de contratar, entenda como funciona",
  apoio: "Reunimos as perguntas que mais ouvimos de quem está começando um projeto com a gente.",
  // Textos reescritos em 2026-11: mesmo sentido, outras palavras.
  itens: [
    {
      p: "Em quanto tempo meu site ou produto digital fica pronto?",
      r: "Varia conforme o tamanho e a complexidade do projeto. Assim que o escopo fica definido, logo depois da primeira conversa, apresentamos um prazo realista e cada etapa até a entrega.",
    },
    {
      p: "Quais projetos a Konelabs desenvolve?",
      r: "Criamos sites institucionais, landing pages, one pages, lojas virtuais, blogs, portais e hotsites. Também desenhamos e evoluímos produtos digitais, como SaaS, aplicativos, plataformas, sistemas internos, interfaces de autocompra e totens. E oferecemos consultoria para times de produto e design.",
    },
    {
      p: "Como o trabalho acontece na prática?",
      r: "Trabalhamos junto com você, em etapas. Primeiro definimos objetivo, entregas e prazos. A partir daí o projeto avança fase por fase, e você aprova cada etapa antes de passarmos para a seguinte.",
    },
    {
      p: "Do que eu preciso para começar?",
      r: "Basta um objetivo ou um problema que você quer resolver. No primeiro encontro entendemos o contexto do seu negócio e as suas necessidades. Em seguida enviamos uma proposta objetiva, com escopo, prazo e investimento.",
    },
    {
      // Confirmar com o Joca: promessa comercial.
      p: "O projeto fica comigo depois da entrega?",
      r: "Fica. Após o pagamento, os arquivos finais são seus, junto com a documentação de design e de implementação que o seu time precisa para dar continuidade. Continuar com a Konelabs depois disso é uma opção, não um compromisso.",
    },
    {
      // Confirmar com o Joca: promessa comercial.
      p: "É possível atender um projeto com prazo apertado?",
      r: "Quando faz sentido, sim. A qualidade da entrega vem primeiro, então em casos urgentes mostramos o que muda no escopo e no resultado, e decidimos juntos o melhor caminho.",
    },
  ],
};

export const chamadaContato = {
  titulo: "Vamos tirar seu próximo projeto do papel",
  texto: "Gostamos de trabalho bem feito e de deixar as coisas melhores. Se você pensa igual, vamos conversar.",
};

export const rodape = {
  assinatura: "Konelabs® desde 2018",
  lema: "Makers gonna make",
  cnpj: "31.249.727/0001-30",
};
