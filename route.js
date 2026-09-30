function verificarLogin(){
  if(!localStorage.getItem("logado")){
    window.location.href="login.html";
  }
}

function logout(){
  localStorage.removeItem("logado");
  window.location.href="index.html";
}
