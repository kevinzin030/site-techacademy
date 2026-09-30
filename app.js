function init(){

  let user =
  JSON.parse(localStorage.getItem("logado"));

  if(!user){

    window.location.href = "login.html";
    return;

  }

  carregarAluno(user);

}


/* =========================
   MENU MOBILE
========================= */

function toggleSidebar(){

  let sidebar =
  document.getElementById("sidebar");

  let overlay =
  document.getElementById("overlay");

  sidebar.classList.toggle("ativo");

  overlay.classList.toggle("ativo");

}


/* =========================
   DASHBOARD
========================= */

function carregarAluno(user){

  let progresso =
  Math.min(user.xp / 10, 100);

  let html = `

  <!-- TOPO -->
  <div class="dashboard-topo">

    <div>

      <h1>
        Olá, ${user.nome}
      </h1>

      <p>
        Bem-vindo de volta.
      </p>

    </div>

    <!-- FOTO -->
    <div
    class="perfil-mini"
    onclick="abrirPerfil()">

      <img src="${user.foto}">

    </div>

  </div>

  <!-- PROGRESSO -->
  <div class="progresso-box">

    <h2>📊 Progresso</h2>

    <p>XP Total</p>

    <div class="barra">

      <div
      class="barra-fill"
      style="width:${progresso}%">

      </div>

    </div>

    <strong>
      ${user.xp} XP
    </strong>

  </div>

  <!-- CURSOS DISPONÍVEIS -->
  <h2 class="titulo-section">

    🚀 Cursos Disponíveis

  </h2>

  <div class="cursos-grid">

    ${gerarCursosDisponiveis(user)}

  </div>

  <!-- CURSOS -->
  <h2 class="titulo-section">

    📚 Meus Cursos

  </h2>

  <div class="cursos-grid">

    ${gerarCursos(user)}

  </div>

  <!-- INFERIOR -->
  <div class="bottom-grid">

    <!-- NOTAS -->
    <div class="box-dark">

      <h2>⭐ Notas</h2>

      ${gerarNotas(user)}

    </div>

    <!-- DOCS -->
    <div class="box-dark">

      <h2>📁 Documentos</h2>

      ${gerarDocumentos(user)}

    </div>

  </div>

  `;

  document.getElementById("app")
  .innerHTML = html;

}


/* =========================
   CURSOS DISPONÍVEIS
========================= */

function gerarCursosDisponiveis(user){

  let html = "";

  cursosDisponiveis.forEach((curso,index)=>{

    let matriculado =
    user.cursos.find(c => c.id === curso.id);

    html += `

    <div class="curso-card">

      <img src="${curso.imagem}">

      <div class="curso-info">

        <span class="categoria">
          ${curso.categoria}
        </span>

        <h3>
          ${curso.nome}
        </h3>

        <p>
          ${curso.descricao}
        </p>

        ${
          matriculado

          ?

          `
          <button disabled>
            MATRICULADO
          </button>
          `

          :

          `
          <button onclick="
            matricular(${index})
          ">
            MATRICULAR
          </button>
          `
        }

      </div>

    </div>

    `;
  });

  return html;

}


/* =========================
   MATRICULAR
========================= */

function matricular(index){

  let user =
  JSON.parse(localStorage.getItem("logado"));

  let curso =
  cursosDisponiveis[index];

  let aluno =
  alunos.find(a => a.login === user.login);

  let jaExiste =
  aluno.cursos.find(c => c.id === curso.id);

  if(jaExiste){

    alert("Você já está matriculado.");
    return;

  }

  aluno.cursos.push(curso);

  localStorage.setItem(
    "alunos",
    JSON.stringify(alunos)
  );

  localStorage.setItem(
    "logado",
    JSON.stringify(aluno)
  );

  alert("Matrícula realizada!");

  carregarAluno(aluno);

}


/* =========================
   MEUS CURSOS
========================= */

function gerarCursos(user){

  if(user.cursos.length === 0){

    return `
      <p>Nenhum curso.</p>
    `;
  }

  let html = "";

  user.cursos.forEach((curso,index)=>{

    html += `

    <div class="curso-card">

      <img src="${curso.imagem}">

      <div class="curso-info">

        <span class="categoria">
          ${curso.categoria}
        </span>

        <h3>
          ${curso.nome}
        </h3>

        <button onclick="
          abrirCurso(${index})
        ">
          CONTINUAR
        </button>

      </div>

    </div>

    `;
  });

  return html;

}


/* =========================
   ABRIR CURSO
========================= */

function abrirCurso(index){

  localStorage.setItem(
    "cursoSelecionado",
    index
  );

  window.location.href =
  "cursos-aluno.html";

}

/* =========================
   NOTAS
========================= */

function gerarNotas(user){

  if(user.notas.length === 0){

    return `
      <p>Nenhuma nota.</p>
    `;
  }

  let html = "";

  user.notas.forEach(nota => {

    html += `

    <div class="nota-item">

      <span>
        ${nota.materia}
      </span>

      <strong>
        ${nota.valor}
      </strong>

    </div>

    `;
  });

  return html;

}


/* =========================
   DOCUMENTOS
========================= */

function gerarDocumentos(user){

  if(user.documentos.length === 0){

    return `
      <p>Nenhum documento.</p>
    `;
  }

  let html = "";

  user.documentos.forEach(doc => {

    html += `

    <p class="doc">

      📄 ${doc}

    </p>

    `;
  });

  return html;

}


/* =========================
   PERFIL
========================= */

function abrirPerfil(){

  window.location.href =
  "perfil.html";

}