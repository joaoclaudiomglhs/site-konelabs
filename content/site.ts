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
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#faq", label: "FAQ" },
];

export const hero = {
  titulo: "Sites e produtos digitais estratégicos para marcas que lideram o seu nicho",
  apoio:
    "Criamos sites e produtos que posicionam a marca, conquistam quem visita e transformam visitantes em clientes.",
  cta: "Vamos conversar",
  origem: "Do Brasil para o mundo",
  desde: "Desde 2018",
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
    { valor: "+8 anos", rotulo: "de história, desde 2018" },
    { valor: "Brasil", rotulo: "clientes em todo o país" },
    { valor: String(projetos.length), rotulo: "projetos em destaque" },
  ],
  setores: [
    "Saúde",
    "Finanças e fintechs",
    "Logística e comércio exterior",
    "Varejo e e-commerce",
    "Indústria",
    "Tecnologia e serviços",
  ],
};

export const faq = {
  titulo: "Antes de contratar, entenda como funciona",
  apoio: "Reunimos as perguntas que mais ouvimos de quem está começando um projeto com a gente.",
  itens: [
    {
      p: "Quanto tempo leva para criar meu site ou produto digital?",
      r: "Depende do tamanho e da complexidade do projeto. Depois da primeira conversa, quando o escopo está claro, passamos um prazo realista e as etapas até a entrega.",
    },
    {
      p: "Que tipo de projeto a Konelabs faz?",
      r: "Sites institucionais, landing pages, one pages, e-commerce, blogs, portais e hotsites. Também criamos e evoluímos produtos digitais, como SaaS, aplicativos, plataformas, sistemas internos, interfaces de autocompra e totens, além de consultoria para times de produto e design.",
    },
    {
      p: "Como funciona o processo?",
      r: "O trabalho é colaborativo e dividido em etapas. Começamos alinhando objetivo, entregas e prazos. Depois o projeto avança fase a fase, e cada etapa é validada com você antes de seguir para a próxima.",
    },
    {
      p: "O que eu preciso ter para começar?",
      r: "Um objetivo ou um problema a resolver. Na primeira conversa entendemos o contexto do negócio e o que você precisa, e depois enviamos uma proposta direta, com escopo, prazo e investimento.",
    },
    {
      // Confirmar com o Joca: promessa comercial.
      p: "Depois da entrega, o projeto é meu?",
      r: "Sim. Os arquivos finais passam a ser seus após o pagamento, com a documentação de design e de implementação necessária para que o seu time continue o trabalho. Seguir com a Konelabs depois disso é uma escolha, não uma obrigação.",
    },
    {
      // Confirmar com o Joca: promessa comercial.
      p: "Vocês atendem projetos com prazo urgente?",
      r: "Quando faz sentido, sim. Priorizamos a qualidade da entrega, então em casos urgentes explicamos o que muda no escopo e no resultado para decidirmos juntos o melhor caminho.",
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
};
