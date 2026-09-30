function carregarAluno(user){

  let html = `
  <h2>Olá, ${user.nome}</h2>
  <p>XP: ${user.xp}</p>

  <h3>Sua Jornada</h3>
  <div class="trilha">
    ${gerarTrilha(user)}
  </div>
  `;

  document.getElementById("app").innerHTML = html;
}

function gerarTrilha(user){
  let trilha = "";

  for(let i=1; i<=10; i++){

    let desbloqueado = user.xp >= (i-1)*100;

    trilha += `
    <div class="nivel ${desbloqueado ? "ativo" : "bloqueado"}"
         onclick="${desbloqueado ? `fazerAtividade(${i})` : `alert('Bloqueado')`}">
      ${i}
    </div>
    `;
  }

  return trilha;
}

function fazerAtividade(nivel){

  let resposta = prompt("Pergunta nível " + nivel + ": 2 + 2 = ?");

  if(resposta == "4"){
    ganharXP(100);
    alert("Acertou! +100 XP");
  }else{
    alert("Errou!");
  }
}

function ganharXP(valor){

  let user = JSON.parse(localStorage.getItem("logado"));
  user.xp += valor;

  localStorage.setItem("logado", JSON.stringify(user));

  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  let index = usuarios.findIndex(u => u.login === user.login);

  usuarios[index] = user;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  location.reload();
}
