/* =========================
   DATABASE
========================= */

let admins = JSON.parse(localStorage.getItem("admins")) || [];
let gestores = JSON.parse(localStorage.getItem("gestores")) || [];
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
let logsLogin = JSON.parse(localStorage.getItem("logsLogin")) || [];

/* =========================
   SALVAR
========================= */

function salvar(){

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
    "cursos",
    JSON.stringify(cursos)
  );

}

/* =========================
   INIT
========================= */

function initAdmin(){

  let user =
  JSON.parse(localStorage.getItem("logado"));

  if(!user || user.tipo !== "admin"){

    alert("Acesso negado");

    location.href = "login.html";

    return;
  }

  dashboard();
}

/* =========================
   MENU MOBILE
========================= */

function toggleMenu(){

  document
  .getElementById("sidebar")
  .classList.toggle("ativo");

  document
  .getElementById("overlay")
  .classList.toggle("ativo");
}

function fecharMenu(){

  document
  .getElementById("sidebar")
  .classList.remove("ativo");

  document
  .getElementById("overlay")
  .classList.remove("ativo");
}

/* =========================
   LOGOUT
========================= */

function logout(){

  localStorage.removeItem("logado");

  location.href = "login.html";
}

/* =========================
   TROCA TELAS
========================= */

function mostrarTela(tela){

  fecharMenu();

  if(tela === "dashboard") dashboard();

  if(tela === "cursos") telaCursos();

  if(tela === "usuarios") telaUsuarios();

  if(tela === "gestores") telaGestores();

  if(tela === "admins") telaAdmins();
}

/* =========================
   DASHBOARD
========================= */

function dashboard(){

  let totalUsuarios =
  alunos.length +
  gestores.length +
  admins.length;

  document.getElementById("app").innerHTML = `

    <div class="metricas-grid">

      <div class="card-metrica">
        <h4>Total de Cursos</h4>
        <span>${cursos.length}</span>
      </div>

      <div class="card-metrica">
        <h4>Total de Alunos</h4>
        <span>${alunos.length}</span>
      </div>

      <div class="card-metrica">
        <h4>Total de Gestores</h4>
        <span>${gestores.length}</span>
      </div>

      <div class="card-metrica">
        <h4>Total de Usuários</h4>
        <span>${totalUsuarios}</span>
      </div>

    </div>

    <div class="painel">

      <h2 style="margin-bottom:20px;">
        Status da Plataforma
      </h2>

      <div class="relatorio-card">

        <p>
          ✅ Plataforma online
        </p>

        <br>

        <p>
          📚 Cursos cadastrados:
          ${cursos.length}
        </p>

        <p>
          🎓 Alunos cadastrados:
          ${alunos.length}
        </p>

        <p>
          🧑‍💼 Gestores cadastrados:
          ${gestores.length}
        </p>

        <p>
          👑 Admins cadastrados:
          ${admins.length}
        </p>

      </div>

    </div>
  `;
}

/* =========================
   CURSOS
========================= */

function telaCursos(){

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2 style="margin-bottom:20px;">
        Criar Curso
      </h2>

      <input
      id="nomeCurso"
      placeholder="Nome do curso">

      <input
      id="tempoCurso"
      placeholder="Tempo do curso">

      <button onclick="criarCurso()">
        Criar Curso
      </button>

    </div>

    <br><br>

    <div class="cursos-grid">

      ${cursos.map(c => `

        <div class="curso-card">

          <div class="curso-body">

            <h3>${c.nome}</h3>

            <p>
              ⏱️ ${c.tempo || "Sem duração"}
            </p>

            <div class="acoes">

              <button
              class="danger"
              onclick="excluirCurso(${c.id})">

                Excluir Curso

              </button>

            </div>

          </div>

        </div>

      `).join("")}

    </div>
  `;
}

function criarCurso(){

  let nome =
  document.getElementById("nomeCurso").value;

  let tempo =
  document.getElementById("tempoCurso").value;

  if(!nome){

    alert("Digite o nome");

    return;
  }

  cursos.push({

    id:Date.now(),

    nome,

    tempo

  });

  salvar();

  telaCursos();
}

function excluirCurso(id){

  if(!confirm("Excluir curso?")) return;

  cursos = cursos.filter(c => c.id !== id);

  salvar();

  telaCursos();
}

/* =========================
   ALUNOS
========================= */

function telaUsuarios(){

  document.getElementById("app").innerHTML = `

    <div class="cursos-grid">

      ${alunos.map(a => `

        <div class="curso-card">

          <div class="curso-body">

            <h3>${a.nome}</h3>

            <p>👤 ${a.login}</p>

            <p>
              📚 Cursos:
              ${a.cursos?.length || 0}
            </p>

          </div>

        </div>

      `).join("")}

    </div>
  `;
}

/* =========================
   GESTORES
========================= */

function telaGestores(){

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2 style="margin-bottom:20px;">
        Novo Gestor
      </h2>

      <input id="gNome" placeholder="Nome">

      <input id="gLogin" placeholder="Login">

      <input id="gSenha" placeholder="Senha">

      <button onclick="criarGestor()">
        Criar Gestor
      </button>

    </div>

    <br><br>

    <div class="cursos-grid">

      ${gestores.map(g => `

        <div class="curso-card">

          <div class="curso-body">

            <h3>${g.nome}</h3>

            <p>${g.login}</p>

          </div>

        </div>

      `).join("")}

    </div>
  `;
}

function criarGestor(){

  let nome =
  document.getElementById("gNome").value;

  let login =
  document.getElementById("gLogin").value;

  let senha =
  document.getElementById("gSenha").value;

  if(!nome || !login || !senha){

    alert("Preencha tudo");

    return;
  }

  gestores.push({

    nome,
    login,
    senha,
    tipo:"gestor"

  });

  salvar();

  telaGestores();
}

/* =========================
   ADMINS
========================= */

function telaAdmins(){

  document.getElementById("app").innerHTML = `

    <div class="painel">

      <h2 style="margin-bottom:20px;">
        Novo Admin
      </h2>

      <input id="aNome" placeholder="Nome">

      <input id="aLogin" placeholder="Login">

      <input id="aSenha" placeholder="Senha">

      <button onclick="criarAdmin()">
        Criar Admin
      </button>

    </div>

    <br><br>

    <div class="cursos-grid">

      ${admins.map(a => `

        <div class="curso-card">

          <div class="curso-body">

            <h3>${a.nome}</h3>

            <p>${a.login}</p>

          </div>

        </div>

      `).join("")}

    </div>
  `;
}

function criarAdmin(){

  let nome =
  document.getElementById("aNome").value;

  let login =
  document.getElementById("aLogin").value;

  let senha =
  document.getElementById("aSenha").value;

  if(!nome || !login || !senha){

    alert("Preencha tudo");

    return;
  }

  admins.push({

    nome,
    login,
    senha,
    tipo:"admin"

  });

  salvar();

  telaAdmins();
}
