/* =========================
   CURSOS
========================= */

let cursos =
JSON.parse(localStorage.getItem("cursos")) || [];


/* =========================
   INIT
========================= */

function initGestor(){

  let user =
  JSON.parse(localStorage.getItem("logado"));

  if(!user || user.tipo !== "gestor"){

    alert("Acesso negado!");

    window.location.href = "login.html";

    return;
  }

  abrirDashboard();

  renderMetricas();
}


/* =========================
   DASHBOARD
========================= */

function abrirDashboard(){

  document.getElementById("app").innerHTML = `

    <div class="welcome-card">

      <h2>Painel Administrativo</h2>

      <p>
        Gerencie cursos, aulas e alunos
        da plataforma.
      </p>

    </div>

  `;

  renderMetricas();
}


/* =========================
   MÉTRICAS
========================= */

function renderMetricas(){

  cursos =
  JSON.parse(localStorage.getItem("cursos")) || [];

  let totalCursos = cursos.length;

  let totalAulas = cursos.reduce((acc, curso) => {

    return acc + (curso.aulas?.length || 0);

  }, 0);

  let totalQuestoes = cursos.reduce((acc, curso) => {

    return acc + (curso.aulas || []).reduce((a, aula) => {

      return a + (aula.questoes?.length || 0);

    }, 0);

  }, 0);

  document.getElementById("metricas").innerHTML = `

    <div class="metricas-grid">

      <div class="card-metrica">

        <h4>Cursos</h4>

        <span>${totalCursos}</span>

      </div>

      <div class="card-metrica">

        <h4>Aulas</h4>

        <span>${totalAulas}</span>

      </div>

      <div class="card-metrica">

        <h4>Questões</h4>

        <span>${totalQuestoes}</span>

      </div>

    </div>

  `;
}


/* =========================
   SALVAR CURSOS
========================= */

function salvarCursos(){

  localStorage.setItem(
    "cursos",
    JSON.stringify(cursos)
  );

  renderMetricas();
}


/* =========================
   LISTAR CURSOS
========================= */

function renderCursos(){

  cursos =
  JSON.parse(localStorage.getItem("cursos")) || [];

  document.getElementById("app").innerHTML = `

    <div class="cursos-grid">

      ${cursos.map((curso,index)=>`

        <div class="curso-card">

          <img
            src="${curso.imagem || ''}"
            class="curso-img"
          >

          <div class="curso-body">

            <h3>${curso.nome}</h3>

            <p>${curso.descricao || ""}</p>

            <small>
              ${curso.categoria || ""}
            </small>

            <div class="acoes-curso">

              <button
                onclick="gerenciarAulas(${index})"
              >
                Aulas
              </button>

              <button
                onclick="editarCurso(${index})"
              >
                Editar
              </button>

              <button
                onclick="excluirCurso(${index})"
              >
                Excluir
              </button>

            </div>

          </div>

        </div>

      `).join("")}

    </div>

  `;
}


/* =========================
   NOVO CURSO
========================= */

function abrirNovoCurso(){

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2>Novo Curso</h2>

      <input
        id="cursoNome"
        placeholder="Nome do curso"
      >

      <input
        id="cursoCategoria"
        placeholder="Categoria"
      >

      <input
        id="cursoImagem"
        placeholder="URL da imagem"
      >

      <textarea
        id="cursoDescricao"
        placeholder="Descrição"
      ></textarea>

      <button onclick="criarCurso()">

        Criar Curso

      </button>

    </div>

  `;
}


function criarCurso(){

  let nome =
  document.getElementById("cursoNome").value;

  let categoria =
  document.getElementById("cursoCategoria").value;

  let imagem =
  document.getElementById("cursoImagem").value;

  let descricao =
  document.getElementById("cursoDescricao").value;

  if(!nome){

    alert("Digite o nome do curso");

    return;
  }

  cursos.push({

    id: Date.now(),

    nome,

    categoria,

    descricao,

    imagem,

    aulas: []

  });

  salvarCursos();

  renderCursos();
}


/* =========================
   EDITAR CURSO
========================= */

function editarCurso(index){

  let curso = cursos[index];

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2>Editar Curso</h2>

      <input
        id="cursoNome"
        value="${curso.nome}"
      >

      <input
        id="cursoCategoria"
        value="${curso.categoria || ""}"
      >

      <input
        id="cursoImagem"
        value="${curso.imagem || ""}"
      >

      <textarea
        id="cursoDescricao"
      >${curso.descricao || ""}</textarea>

      <button
        onclick="salvarEdicaoCurso(${index})"
      >
        Salvar
      </button>

    </div>

  `;
}


function salvarEdicaoCurso(index){

  cursos[index].nome =
  document.getElementById("cursoNome").value;

  cursos[index].categoria =
  document.getElementById("cursoCategoria").value;

  cursos[index].imagem =
  document.getElementById("cursoImagem").value;

  cursos[index].descricao =
  document.getElementById("cursoDescricao").value;

  salvarCursos();

  renderCursos();
}


/* =========================
   EXCLUIR CURSO
========================= */

function excluirCurso(index){

  if(!confirm("Excluir curso?"))
    return;

  cursos.splice(index, 1);

  salvarCursos();

  renderCursos();
}


/* =========================
   GERENCIAR AULAS
========================= */

function gerenciarAulas(index){

  let curso = cursos[index];

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2>${curso.nome}</h2>

      <input
        id="nomeAula"
        placeholder="Nome da aula"
      >

      <button
        onclick="criarAula(${index})"
      >
        Adicionar Aula
      </button>

      <div class="lista-aulas">

        ${(curso.aulas || []).map((aula,aulaIndex)=>`

          <div class="aula-card">

            <h3>${aula.titulo}</h3>

            <div class="acoes-aula">

              <button
                onclick="abrirQuestoes(${index},${aulaIndex})"
              >
                Questões
              </button>

              <button
                onclick="editarAula(${index},${aulaIndex})"
              >
                Editar
              </button>

              <button
                onclick="excluirAula(${index},${aulaIndex})"
              >
                Excluir
              </button>

            </div>

          </div>

        `).join("")}

      </div>

    </div>

  `;
}


/* =========================
   CRIAR AULA
========================= */

function criarAula(index){

  let titulo =
  document.getElementById("nomeAula").value;

  if(!titulo){

    alert("Digite o nome da aula");

    return;
  }

  cursos[index].aulas.push({

    id: Date.now(),

    titulo,

    material: {

      titulo,

      conteudo:
      "Conteúdo da aula..."

    },

    questoes: []

  });

  salvarCursos();

  gerenciarAulas(index);
}


/* =========================
   EDITAR AULA
========================= */

function editarAula(cursoIndex, aulaIndex){

  let aula =
  cursos[cursoIndex].aulas[aulaIndex];

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2>Editar Aula</h2>

      <input
        id="tituloAula"
        value="${aula.titulo}"
      >

      <textarea
        id="conteudoAula"
      >${aula.material?.conteudo || ""}</textarea>

      <button
        onclick="salvarAula(${cursoIndex},${aulaIndex})"
      >
        Salvar Aula
      </button>

    </div>

  `;
}


function salvarAula(cursoIndex, aulaIndex){

  let aula =
  cursos[cursoIndex].aulas[aulaIndex];

  aula.titulo =
  document.getElementById("tituloAula").value;

  aula.material.conteudo =
  document.getElementById("conteudoAula").value;

  salvarCursos();

  gerenciarAulas(cursoIndex);
}


/* =========================
   EXCLUIR AULA
========================= */

function excluirAula(cursoIndex, aulaIndex){

  if(!confirm("Excluir aula?"))
    return;

  cursos[cursoIndex]
  .aulas
  .splice(aulaIndex,1);

  salvarCursos();

  gerenciarAulas(cursoIndex);
}


/* =========================
   QUESTÕES
========================= */

function abrirQuestoes(cursoIndex, aulaIndex){

  let aula =
  cursos[cursoIndex].aulas[aulaIndex];

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2>${aula.titulo}</h2>

      <input
        id="pergunta"
        placeholder="Pergunta"
      >

      <input
        id="alt1"
        placeholder="Alternativa 1"
      >

      <input
        id="alt2"
        placeholder="Alternativa 2"
      >

      <input
        id="alt3"
        placeholder="Alternativa 3"
      >

      <input
        id="alt4"
        placeholder="Alternativa 4"
      >

      <input
        id="correta"
        type="number"
        placeholder="Resposta correta (0-3)"
      >

      <button
        onclick="adicionarQuestao(${cursoIndex},${aulaIndex})"
      >
        Adicionar Questão
      </button>

      <div class="lista-questoes">

        ${(aula.questoes || []).map((q,i)=>`

          <div class="questao-card">

            <h3>
              ${i + 1}. ${q.pergunta}
            </h3>

            ${(q.alternativas || []).map((a,index)=>`

              <p>
                ${index}. ${a}
              </p>

            `).join("")}

            <strong>
              Correta:
              ${q.correta}
            </strong>

          </div>

        `).join("")}

      </div>

    </div>

  `;
}


/* =========================
   ADICIONAR QUESTÃO
========================= */

function adicionarQuestao(
  cursoIndex,
  aulaIndex
){

  let pergunta =
  document.getElementById("pergunta").value;

  let alternativas = [

    document.getElementById("alt1").value,
    document.getElementById("alt2").value,
    document.getElementById("alt3").value,
    document.getElementById("alt4").value

  ];

  let correta =
  Number(
    document.getElementById("correta").value
  );

  if(!pergunta){

    alert("Digite a pergunta");

    return;
  }

  cursos[cursoIndex]
  .aulas[aulaIndex]
  .questoes.push({

    pergunta,

    alternativas,

    correta

  });

  salvarCursos();

  abrirQuestoes(
    cursoIndex,
    aulaIndex
  );
}


/* =========================
   RELATÓRIOS
========================= */

function renderRelatorios(){

  let alunos =
  JSON.parse(localStorage.getItem("alunos")) || [];

  document.getElementById("app").innerHTML = `

    <div class="relatorios-grid">

      ${alunos.map(aluno => `

        <div class="relatorio-card">

          <h3>${aluno.nome}</h3>

          <p>
            Login:
            ${aluno.login}
          </p>

          <p>
            XP:
            ${aluno.xp}
          </p>

          <p>
            Cursos:
            ${aluno.cursos.length}
          </p>

          <p>
            Certificados:
            ${aluno.certificados.length}
          </p>

          <p>
            Cadastro:
            ${aluno.dataCadastro}
          </p>

        </div>

      `).join("")}

    </div>

  `;
}


/* =========================
   MENU MOBILE
========================= */

function toggleMenu(){

  document
  .getElementById("sidebar")
  .classList
  .toggle("ativo");

  document
  .getElementById("overlay")
  .classList
  .toggle("ativo");
}


/* =========================
   LOGOUT
========================= */

function confirmarLogout(){

  if(confirm("Deseja sair?")){

    localStorage.removeItem("logado");

    window.location.href =
    "login.html";
  }
}