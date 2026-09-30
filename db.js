/* =========================
   BASE DE DADOS LOCAL
========================= */

let admins = JSON.parse(localStorage.getItem("admins")) || [];
let gestores = JSON.parse(localStorage.getItem("gestores")) || [];
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let logsLogin = JSON.parse(localStorage.getItem("logsLogin")) || [];


/* =========================
   CURSOS BASE
========================= */

const cursosBase = [

  {
    id: 1,

    nome: "UX e UI Design",

    categoria: "DESIGN",

    descricao:
      "Curso voltado para experiência do usuário e criação de interfaces digitais.",

    imagem:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",

    aulas: [

      {
        id: 1,

        titulo: "Fundamentos de UX",

        material: {

          titulo: "Introdução ao UX",

          conteudo: `
Módulo 1: Introdução ao Universo de UX e UI Design
Seja bem-vindo ao ponto de partida da sua jornada no design digital. Sempre que você abre um aplicativo no seu celular, faz uma compra em um site ou assiste a um vídeo em uma plataforma de streaming, você está interagindo com o trabalho de profissionais de UX (User Experience) e UI (User Interface).

Embora andem de mãos dadas, essas duas disciplinas possuem focos diferentes e complementares. Neste módulo, você entenderá o que cada uma significa, como elas funcionam na prática e por que são fundamentais para o sucesso de qualquer produto digital.

O que é UX Design? (User Experience)
UX Design, ou Design de Experiência do Usuário, é a disciplina que estuda e planeja como uma pessoa se sente, reage e se comporta ao interagir com um produto ou serviço. O principal objetivo do UX é garantir que essa jornada seja útil, fácil de usar e agradável.

O pilar central do UX é a empatia. Isso significa que o designer não projeta com base nos seus próprios gostos, mas sim investigando a fundo as reais necessidades, dores e limitações do público-alvo.

Como funciona o processo de UX?
No dia a dia, o profissional de UX trabalha majoritariamente com estratégia, pesquisa e estrutura. O processo costuma envolver:

Pesquisa com Usuários (User Research): Entrevistar e observar pessoas reais para entender o que elas precisam e quais problemas enfrentam.

Criação de Personas: Perfis semi-fictícios que representam os clientes ideais do produto, ajudando a equipe a manter o foco em quem realmente importa.

Arquitetura de Informação: Organizar e estruturar o conteúdo do site ou aplicativo para que as informações sejam fáceis de encontrar.

Jornada do Usuário: Mapear o passo a passo que o cliente faz desde o momento em que abre o aplicativo até concluir seu objetivo final (como finalizar uma compra).

O que é UI Design? (User Interface)
UI Design, ou Design de Interface do Usuário, é a parte visual e tangível com a qual o usuário interage diretamente. É a tradução física e estética de toda a estratégia definida pelo UX. Se o UX planeja como o aplicativo funciona por trás das cortinas, o UI define como ele se apresenta visualmente na tela.

O grande objetivo do UI é criar uma interface que seja não apenas atraente, mas também clara e intuitiva, guiando os olhos do usuário de forma natural.

Como funciona o processo de UI?
O profissional de UI transforma rascunhos estruturais em telas finais de alta fidelidade, utilizando ferramentas de mercado como o Figma. O trabalho envolve o domínio de elementos como:

Tipografia: Escolha das fontes adequadas e definição da hierarquia visual (o que deve ser lido primeiro).

Psicologia das Cores e Contraste: Uso de paletas de cores que transmitam a identidade da marca e garantam acessibilidade (permitindo que qualquer pessoa, incluindo daltônicos, consiga navegar).

Componentes de Interface: Desenho de botões, menus, ícones, campos de formulário e animações de transição.

Consistência: Garantir que o padrão visual seja o mesmo em todas as telas, gerando confiança e familiaridade para o usuário.

A Sinergia: Como UX e UI trabalham juntos
Para entender perfeitamente a diferença, imagine a construção de uma casa.

O UX é o arquiteto e o engenheiro estrutural. Ele define quantos cômodos a casa precisa ter para atender à família, onde ficará a fiação elétrica e se o fluxo de passagem da cozinha para a sala faz sentido no cotidiano. O UI é o designer de interiores. Ele escolhe as cores das paredes, o tipo de piso, o estilo dos móveis e a iluminação para que o ambiente seja bonito, aconchegante e convidativo.

Uma casa bonita com infiltração e tomadas mal localizadas é uma experiência ruim (UI bom, UX ruim). Uma casa com ótima estrutura, mas escura, sem pintura e desconfortável também afasta as pessoas (UX bom, UI ruim). O produto digital perfeito nasce do equilíbrio exato entre os dois.
          `
        },

        questoes: [

          {
            pergunta:
              "A usabilidade de um sistema está relacionada principalmente a:",

            alternativas: [
              "Aumento da memória RAM",
              "Facilidade e conforto no uso do sistema",
              "Velocidade do processador",
              "Capacidade do hardware"
            ],

            correta: 1
          },

          {
            pergunta:
              "Qual requisito está diretamente relacionado à ergonomia de interfaces?",

            alternativas: [
              "Portabilidade",
              "Confiabilidade",
              "Usabilidade",
              "Interoperabilidade"
            ],

            correta: 2
          },

          {
            pergunta:
              "A usabilidade inclui características como:",

            alternativas: [
              "Inteligibilidade, aprendizado e operacionalidade",
              "Overclock e processamento paralelo",
              "Virtualização e criptografia",
              "Banco de dados e compilação"
            ],

            correta: 0
          }

        ]
      },

      {
        id: 2,

        titulo: "Princípios de UI",

        material: {

          titulo: "Introdução ao UI",

          conteudo: `
Módulo 2: O Processo de Design e a Descoberta do Problema
Agora que você já conhece a diferença fundamental entre UX e UI, é hora de entender como esses conceitos ganham vida. No desenvolvimento de produtos digitais, um erro muito comum é começar a desenhar telas logo no primeiro dia. Designers de sucesso seguem um processo estruturado para garantir que estão resolvendo o problema certo, para as pessoas certas.

Neste módulo, você vai descobrir a metodologia mais famosa do mercado para guiar esse processo — o Double Diamond (Duplo Diamante) — e aprenderá como a fase de pesquisa e empatia molda tudo o que usamos na internet.

O Modelo Double Diamond (Duplo Diamante)
Criado pelo British Design Council, o Double Diamond é uma representação visual do processo de design dividido em quatro fases essenciais. Ele se baseia em momentos de divergência (abrir o leque para explorar possibilidades) e convergência (afunilar para tomar decisões).

O modelo é dividido em dois diamantes principais:

1. O Primeiro Diamante: Descobrir e Definir (O Espaço do Problema)
Antes de pensar em soluções, precisamos dominar o problema.

Descobrir (Imersão): É a fase de abertura. Aqui, o designer faz pesquisas, entrevista usuários, analisa concorrentes e coleta o máximo de dados possível. O objetivo é expandir o conhecimento e questionar as suposições iniciais.

Definir (Foco): É hora de afunilar. Com todos os dados coletados, a equipe filtra o que realmente importa para identificar a verdadeira dor do usuário. O resultado desta fase é a definição clara do problema real que precisa ser resolvido.

2. O Segundo Diamante: Desenvolver e Entregar (O Espaço da Solução)
Com o problema validado, o foco muda para a criação da resposta ideal.

Desenvolver (Ideação): Momento de abrir o leque novamente. A equipe faz briefings, brainstormings e desenha vários esboços e fluxos (wireframes) para explorar diferentes formas de resolver o problema definido.

Entregar (Implementação): O afunilamento final. As melhores ideias são transformadas em protótipos de alta fidelidade, testadas com usuários reais para ajustes e, finalmente, enviadas para a equipe de desenvolvimento (programação) construir o produto final.

O Poder da Pesquisa com Usuários (User Research)
Como vimos no módulo anterior, a empatia é a alma do UX. A única forma de projetar com empatia é conversando e entendendo quem vai usar o seu produto. A pesquisa com usuários serve para validar se aquela "ideia genial" que a empresa teve realmente faz sentido para o mercado.

Existem duas formas principais de coletar esses dados:

Pesquisa Quantitativa: Responde ao "O quê?" e "Quanto?". É feita através de questionários fechados, métricas de acesso e dados numéricos. Ela ajuda a entender o comportamento em larga escala (Ex: "80% dos usuários abandonam o carrinho na tela de frete").

Pesquisa Qualitativa: Responde ao "Por quê?" e "Como?". É realizada por meio de entrevistas individuais, testes de usabilidade e observação direta. Ela revela as motivações e sentimentos por trás dos números (Ex: "Os usuários abandonam o carrinho porque não entenderam onde digitar o cupom de desconto").

Conhecendo o Usuário: Personas e Mapas de Empatia
Para que a equipe de design não se perca em achismos, os dados coletados nas pesquisas são consolidados em ferramentas visuais. As duas principais são:

A Persona
É um perfil semi-fictício do usuário ideal do produto, construído com base em dados reais de comportamento. Em vez de focar apenas em dados demográficos genéricos (como "Homens, de 25 a 35 anos"), uma persona traz detalhes humanos:

Exemplo de Persona: Lucas, 29 anos, analista de marketing. Trabalha em home office, tem uma rotina corrida e costuma esquecer de beber água. Ele precisa de um aplicativo de alarme prático, silencioso para não atrapalhar reuniões, mas que seja persistente o suficiente para tirá-lo da cadeira.

O Mapa de Empatia
Uma ferramenta visual que ajuda o designer a se colocar no lugar do usuário respondendo a seis perguntas fundamentais sobre ele: O que ele vê? O que ele ouve? O que ele realmente pensa e sente? O que ele fala e faz? Quais são suas dores? Quais são suas necessidades de sucesso?
          `
        },

        questoes: [

          {
            pergunta: "O que significa UI?",

            alternativas: [
              "Ultra Interface",
              "Universal Interface",
              "User Interface",
              "User Internet"
            ],

            correta: 2
          },

          {
            pergunta:
              "Qual é o principal objetivo do UI Design?",

            alternativas: [
              "Melhorar servidores",
              "Criar interfaces visuais agradáveis",
              "Programar banco de dados",
              "Configurar redes"
            ],

            correta: 1
          }

        ]
      }

    ]
  },

  {
    id: 2,

    nome: "Desenvolvimento Web",

    categoria: "DESENVOLVIMENTO",

    descricao:
      "Curso introdutório sobre tecnologias utilizadas no desenvolvimento web.",

    imagem:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",

    aulas: [

      {
        id: 1,

        titulo: "Fundamentos do Desenvolvimento Web",

        material: {

          titulo: "Introdução ao Desenvolvimento Web",

          conteudo: `
Módulo 1: Web Design Responsivo e Adaptação de Telas
Hoje em dia, as pessoas acessam a internet a partir de uma infinidade de dispositivos: smartphones de telas pequenas, tablets, notebooks e monitores desktop gigantescos. Antigamente, as empresas criavam dois sites totalmente separados (um para computador e outro para celular). Hoje, o mercado utiliza o conceito de Web Design Responsivo.

Neste módulo, você vai aprender como estruturar layouts que se adaptam inteligentemente a qualquer tamanho de tela, garantindo que a experiência do usuário (UX) e a beleza da interface (UI) permaneçam impecáveis, independentemente do dispositivo utilizado.

O que é Web Design Responsivo?
O design responsivo é uma abordagem de desenvolvimento e design visual que faz com que as páginas da web se ajustem automaticamente ao tamanho da tela do usuário. Em vez de criar layouts estáticos e rígidos, o designer projeta uma estrutura fluida.

Quando um site é responsivo, o conteúdo se reorganiza de forma natural: imagens mudam de tamanho, textos se reajustam para manter a leitura confortável e colunas de texto que ficavam lado a lado no computador são empilhadas uma embaixo da outra na tela vertical de um smartphone. O objetivo principal é eliminar a necessidade de o usuário dar "zoom" com os dedos para conseguir ler um texto ou clicar em um botão.

Os Três Pilares do Layout Responsivo
Para criar uma interface que se adapta perfeitamente, o UI Designer precisa dominar três conceitos fundamentais de estrutura:

1. Grids Fluidas (Malhas Flexíveis)
No design tradicional para impressão (como jornais e revistas), os tamanhos são fixos (em centímetros ou pixels). No design responsivo, usamos proporções e porcentagens. O layout é dividido em colunas invisíveis chamadas de grid. Em uma tela de computador, o site pode usar 12 colunas para espalhar o conteúdo horizontalmente. Em um celular, essa mesma grid se comprime para 4 colunas, reorganizando os elementos verticalmente.

2. Imagens e Mídias Flexíveis
As imagens e vídeos de um site responsivo precisam de regras de dimensionamento flexíveis. Elas são configuradas para nunca ultrapassarem a largura máxima da tela do dispositivo. Isso impede que uma foto gigante quebre o layout do celular ou faça surgir aquela barra de rolagem horizontal desconfortável na parte inferior da tela.

3. Breakpoints (Pontos de Quebra)
Os breakpoints são os pontos exatos de largura de tela onde o layout do site muda visualmente para se adaptar melhor. Por exemplo, o designer define que quando a tela for menor que 768 pixels (tamanho comum de tablets), o menu horizontal do topo vai sumir e se transformar em um "menu hambúrguer" (aquele ícone com três linhas horizontais). Os pontos de quebra mais comuns do mercado se dividem em: Mobile (celulares), Tablet e Desktop (computadores).

A Filosofia Mobile-First (Primeiro o Celular)
Criada pelo designer Luke Wroblewski, a estratégia Mobile-First dita que o design de um site deve ser pensado e projetado primeiro para as telas de celulares, e só depois expandido para telas maiores de computadores.

Existem dois grandes motivos para o mercado adotar essa filosofia hoje:

Foco no Essencial: A tela do celular é muito pequena. Começar por ela força o designer a priorizar o que realmente importa para o usuário, eliminando distrações e excessos visuais que muitas vezes poluem a versão de desktop.

Desempenho e Mercado: A maior parte do tráfego de internet no mundo vem de dispositivos móveis. Além disso, os mecanismos de busca (como o Google) priorizam no ranqueamento os sites que funcionam perfeitamente bem no celular.
          `
        },

        questoes: [

          {
            pergunta:
              "Qual linguagem é utilizada para estruturar páginas web?",

            alternativas: [
              "CSS",
              "HTML",
              "Python",
              "Java"
            ],

            correta: 1
          },

          {
            pergunta:
              "Qual tecnologia é usada para estilizar páginas web?",

            alternativas: [
              "CSS",
              "SQL",
              "PHP",
              "C#"
            ],

            correta: 0
          },

          {
            pergunta:
              "O JavaScript é utilizado principalmente para:",

            alternativas: [
              "Criar banco de dados",
              "Montar servidores físicos",
              "Adicionar interatividade às páginas",
              "Formatar textos acadêmicos"
            ],

            correta: 2
          }

        ]
      }

    ]
  }

];


/* =========================
   CURSOS DISPONÍVEIS
========================= */

let cursosDisponiveis = [...cursosBase];


/* =========================
   ADMIN PADRÃO
========================= */

function criarAdminPadrao() {

  let existe =
  admins.find(a => a.login === "god");

  if (!existe) {

    admins.push({

      nome: "Administrador",

      login: "god",

      senha: "1234"

    });

    salvar();

  }

}


/* =========================
   GARANTIR ESTRUTURA
========================= */

function corrigirEstrutura() {

  alunos.forEach(aluno => {

    if (aluno.xp == null)
      aluno.xp = 0;

    if (!aluno.foto)
      aluno.foto =
      "https://i.pravatar.cc/300?u=" + aluno.login;

    if (!aluno.cursos)
      aluno.cursos = [];

    if (!aluno.certificados)
      aluno.certificados = [];

    if (!aluno.notas)
      aluno.notas = [];

    if (!aluno.documentos)
      aluno.documentos = [];

    if (!aluno.dataCadastro)
      aluno.dataCadastro =
      new Date().toLocaleDateString("pt-BR");

  });

}


/* =========================
   SALVAR
========================= */

function salvar() {

  localStorage.setItem(
    "admins",
    JSON.stringify(admins)
  );

  localStorage.setItem(
    "gestores",
    JSON.stringify(gestores)
  );

  localStorage.setItem(
    "alunos",
    JSON.stringify(alunos)
  );

  localStorage.setItem(
    "logsLogin",
    JSON.stringify(logsLogin)
  );

}


/* =========================
   LOGIN EXISTE
========================= */

function loginExiste(login) {

  return (

    admins.find(u => u.login === login) ||
    gestores.find(u => u.login === login) ||
    alunos.find(u => u.login === login)

  );

}


/* =========================
   BUSCAR USUÁRIO
========================= */

function buscarUsuario(login, senha) {

  return (

    admins.find(u =>
      u.login === login &&
      u.senha === senha
    ) ||

    gestores.find(u =>
      u.login === login &&
      u.senha === senha
    ) ||

    alunos.find(u =>
      u.login === login &&
      u.senha === senha
    )

  );

}


/* =========================
   TIPO USUÁRIO
========================= */

function tipoUsuario(login) {

  if (admins.find(a => a.login === login))
    return "admin";

  if (gestores.find(g => g.login === login))
    return "gestor";

  if (alunos.find(a => a.login === login))
    return "aluno";

  return null;

}


/* =========================
   LOG LOGIN
========================= */

function salvarLogLogin(usuario) {

  logsLogin.push({

    usuario: usuario.login,

    nome: usuario.nome,

    tipo: tipoUsuario(usuario.login),

    data: new Date().toLocaleString()

  });

  salvar();

}


/* =========================
   CADASTRAR GESTOR
========================= */

function cadastrarGestor(
  nome,
  login,
  senha
) {

  if (loginExiste(login)) {

    alert("Login já existe!");
    return false;

  }

  gestores.push({
    nome,
    login,
    senha
  });

  salvar();

  return true;

}


/* =========================
   CADASTRAR ALUNO
========================= */

function cadastrarAluno(
  nome,
  cpf,
  nascimento,
  login,
  senha
) {

  if (loginExiste(login)) {

    alert("Login já existe!");
    return false;

  }

  alunos.push({

    nome,

    cpf,

    nascimento,

    login,

    senha,

    xp: 0,

    foto:
    "https://i.pravatar.cc/300?u=" + login,

    cursos: [],

    certificados: [],

    notas: [],

    documentos: [],

    dataCadastro:
    new Date().toLocaleDateString("pt-BR")

  });

  salvar();

  return true;

}


/* =========================
   CURSOS / AÇÕES
========================= */

function matricularCurso(login, curso) {

  let aluno =
  alunos.find(a => a.login === login);

  if (!aluno) return;

  let existe =
  aluno.cursos.find(c => c.id === curso.id);

  if (existe) return;

  aluno.cursos.push(curso);

  salvar();

}


function concluirCurso(
  login,
  nomeCertificado
) {

  let aluno =
  alunos.find(a => a.login === login);

  if (!aluno) return;

  aluno.certificados.push(
    nomeCertificado
  );

  salvar();

}


function adicionarNota(
  login,
  materia,
  valor
) {

  let aluno =
  alunos.find(a => a.login === login);

  if (!aluno) return;

  aluno.notas.push({
    materia,
    valor
  });

  salvar();

}


function adicionarDocumento(
  login,
  documento
) {

  let aluno =
  alunos.find(a => a.login === login);

  if (!aluno) return;

  aluno.documentos.push(documento);

  salvar();

}


function ganharXP(login, valor) {

  let aluno =
  alunos.find(a => a.login === login);

  if (!aluno) return;

  aluno.xp += valor;

  salvar();

}


/* =========================
   LISTAGENS
========================= */

function getAdmins() {
  return admins;
}

function getGestores() {
  return gestores;
}

function getAlunos() {
  return alunos;
}

function getLogs() {
  return logsLogin;
}


/* =========================
   ALUNO TESTE
========================= */

function criarAlunoTeste() {

  let existe =
  alunos.find(a => a.login === "kevin");

  if (!existe) {

    alunos.push({

      nome: "Kevin Luiz",

      cpf: "000.000.000-00",

      nascimento: "2000-01-01",

      login: "kevin",

      senha: "123",

      xp: 750,

      foto:
      "https://i.pravatar.cc/300?img=12",

      cursos: [],

      certificados: [
        "React_Avancado_Certificado.pdf"
      ],

      notas: [

        {
          materia: "UX E UI",
          valor: "9.5"
        },

        {
          materia: "Banco de Dados",
          valor: "8.7"
        }

      ],

      documentos: [

        "Contrato_Academico.pdf",

        "Historico_Escolar.pdf"

      ],

      dataCadastro: "15/05/2026"

    });

    salvar();

  }

}
/* =========================
   INICIALIZAR CURSOS
========================= */

if (!localStorage.getItem("cursos")) {

  localStorage.setItem(
    "cursos",
    JSON.stringify(cursosBase)
  );

}


/* =========================
   INICIALIZAÇÃO
========================= */

criarAdminPadrao();

corrigirEstrutura();

criarAlunoTeste();

salvar();