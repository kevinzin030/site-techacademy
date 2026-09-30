/* =========================
   LOGIN
========================= */

function login(){

  let log = document.getElementById("usuario").value;
  let sen = document.getElementById("senha").value;

  if(!log || !sen){
    alert("Preencha login e senha!");
    return;
  }

  // ADMIN
  let user = admins.find(u => u.login === log && u.senha === sen);
  if(user){
    localStorage.setItem("logado", JSON.stringify({...user, tipo:"admin"}));
    salvarLogLogin(user);
   return window.location.href="admin.html";

  }

  // GESTOR
  user = gestores.find(u => u.login === log && u.senha === sen);
  if(user){
    localStorage.setItem("logado", JSON.stringify({...user, tipo:"gestor"}));
    salvarLogLogin(user);
     return window.location.href="gestor.html";
  }

  // ALUNO
  user = alunos.find(u => u.login === log && u.senha === sen);
  if(user){
    localStorage.setItem("logado", JSON.stringify({...user, tipo:"aluno"}));
    salvarLogLogin(user);
    return window.location.href="dashboard.html";
  }

  alert("Login inválido!");
}


/* =========================
   CADASTRO (ALUNO)
========================= */

function cadastrar(){

  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let nascimento = document.getElementById("nascimento").value;
  let userLogin = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  // VALIDAÇÃO
  if(!nome || !cpf || !nascimento || !userLogin || !senha){
    alert("Preencha todos os campos!");
    return;
  }

  // EVITA DUPLICADO
  let existe =
    admins.find(u => u.login === userLogin) ||
    gestores.find(u => u.login === userLogin) ||
    alunos.find(u => u.login === userLogin);

  if(existe){
    alert("Usuário já existe!");
    return;
  }

  // CRIA ALUNO
  let novo = {
    nome,
    cpf,
    nascimento,
    login: userLogin,
    senha,
    xp: 0,
    cursos: [], // 🔥 essencial
    criadoEm: new Date().toLocaleString()
  };

  alunos.push(novo);
  salvar();

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}


/* =========================
   LOGOUT
========================= */

function logout(){
  localStorage.removeItem("logado");
  window.location.href = "login.html";
}


/* =========================
   VERIFICAR LOGIN
========================= */

function verificarLogin(){

  let user = JSON.parse(localStorage.getItem("logado"));

  if(!user){
    window.location.href = "login.html";
  }

  return user;
}


/* =========================
   PEGAR USUÁRIO LOGADO
========================= */

function getUsuarioLogado(){
  return JSON.parse(localStorage.getItem("logado"));
}
