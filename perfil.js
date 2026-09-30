function carregarPerfil(){

  let user =
  JSON.parse(localStorage.getItem("logado"));

  if(!user){

    window.location.href = "login.html";
    return;

  }

  // PERFIL
  document.getElementById("nomePerfil")
  .innerText = user.nome;

  document.getElementById("emailPerfil")
  .innerText = user.login;

  document.getElementById("fotoPerfil")
  .src = user.foto;

  // INPUTS
  document.getElementById("novoNome")
  .value = user.nome;

  document.getElementById("novoCpf")
  .value = user.cpf;

  document.getElementById("novoNascimento")
  .value = user.nascimento;

  document.getElementById("novoLogin")
  .value = user.login;

  // STATUS
  document.getElementById("dataCadastro")
  .innerText = user.dataCadastro;

  document.getElementById("totalCursos")
  .innerText = user.cursos.length;

  document.getElementById("totalCertificados")
  .innerText =
  user.certificados.length;

  carregarCursos(user);

  carregarCertificados(user);

}


/* =========================
   CURSOS
========================= */

function carregarCursos(user){

  let html = "";

  if(user.cursos.length === 0){

    html =
    "<p>Nenhum curso em andamento.</p>";

  }else{

    user.cursos.forEach(curso => {

      html += `

      <div class="item-perfil">

        📚 ${curso.nome}

      </div>

      `;

    });

  }

  document.getElementById("listaCursos")
  .innerHTML = html;

}


/* =========================
   CERTIFICADOS
========================= */

function carregarCertificados(user){

  let html = "";

  if(user.certificados.length === 0){

    html =
    "<p>Nenhum certificado concluído.</p>";

  }else{

    user.certificados.forEach(cert => {

      html += `

      <div class="item-perfil">

        🏆 ${cert}

      </div>

      `;

    });

  }

  document.getElementById("listaCertificados")
  .innerHTML = html;

}


/* =========================
   SALVAR ALTERAÇÕES
========================= */

function salvarAlteracoes(){

  let user =
  JSON.parse(localStorage.getItem("logado"));

  let alunos =
  JSON.parse(localStorage.getItem("alunos"));

  // PEGAR DADOS
  let nome =
  document.getElementById("novoNome").value;

  let cpf =
  document.getElementById("novoCpf").value;

  let nascimento =
  document.getElementById("novoNascimento").value;

  let login =
  document.getElementById("novoLogin").value;

  let senha =
  document.getElementById("novaSenha").value;

  // VALIDA LOGIN
  let loginExisteOutro = alunos.find(a =>

    a.login === login &&
    a.login !== user.login

  );

  if(loginExisteOutro){

    alert("Login já existe!");
    return;

  }

  // ALTERAR
  user.nome = nome;

  user.cpf = cpf;

  user.nascimento = nascimento;

  user.login = login;

  if(senha){
    user.senha = senha;
  }

  // SALVAR
  let index =
  alunos.findIndex(a =>
    a.login ===
    JSON.parse(localStorage.getItem("logado")).login
  );

  alunos[index] = user;

  localStorage.setItem(
    "alunos",
    JSON.stringify(alunos)
  );

  localStorage.setItem(
    "logado",
    JSON.stringify(user)
  );

  alert("Dados atualizados!");

  location.reload();

}


/* =========================
   TROCAR FOTO
========================= */

function trocarFoto(event){

  let arquivo = event.target.files[0];

  let reader = new FileReader();

  reader.onload = function(e){

    let user =
    JSON.parse(localStorage.getItem("logado"));

    let alunos =
    JSON.parse(localStorage.getItem("alunos"));

    user.foto = e.target.result;

    let index =
    alunos.findIndex(a =>
      a.login === user.login
    );

    alunos[index] = user;

    localStorage.setItem(
      "alunos",
      JSON.stringify(alunos)
    );

    localStorage.setItem(
      "logado",
      JSON.stringify(user)
    );

    document.getElementById("fotoPerfil")
    .src = user.foto;

  };

  reader.readAsDataURL(arquivo);

}


/* =========================
   DESATIVAR
========================= */

function desativarConta(){

  let confirmar =
  confirm(
    "Deseja realmente desativar sua conta?"
  );

  if(!confirmar) return;

  let user =
  JSON.parse(localStorage.getItem("logado"));

  let alunos =
  JSON.parse(localStorage.getItem("alunos"));

  alunos =
  alunos.filter(a =>
    a.login !== user.login
  );

  localStorage.setItem(
    "alunos",
    JSON.stringify(alunos)
  );

  localStorage.removeItem("logado");

  alert("Conta removida!");

  window.location.href = "index.html";

}


/* =========================
   LOGOUT
========================= */

function logout(){

  localStorage.removeItem("logado");

  window.location.href = "login.html";

}


/* =========================
   VOLTAR
========================= */

function voltarDashboard(){

  window.location.href =
  "dashboard.html";

}
function confirmarSaida() {

    if (
        confirm(
            "Você realmente deseja sair?\n\nSerá necessário fazer login novamente para acessar a plataforma."
        )
    ) {
        logout();
    }

}