function init(){
  const user = JSON.parse(localStorage.getItem("logado"));
  if(!user){ window.location.href="login.html"; return; }
  carregarAluno(user);
  preencherPerfilTopo(user);
}

function toggleSidebar(){
  const sidebar=document.getElementById("sidebar");
  const overlay=document.getElementById("overlay");
  if(sidebar) sidebar.classList.toggle("ativo");
  if(overlay) overlay.classList.toggle("ativo");
}

function abrirDashboard(){
  const user=JSON.parse(localStorage.getItem("logado"));
  if(user) carregarAluno(user);
  fecharSidebarMobile();
}

function fecharSidebarMobile(){
  const sidebar=document.getElementById("sidebar");
  const overlay=document.getElementById("overlay");
  if(window.innerWidth<=800){
    sidebar?.classList.remove("ativo");
    overlay?.classList.remove("ativo");
  }
}

function preencherPerfilTopo(user){
  const foto=user.foto || ("https://i.pravatar.cc/100?u="+encodeURIComponent(user.login||user.nome||"aluno"));
  const iniciais=(user.nome||"Aluno").split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase();
  const side=document.getElementById("sidebar-profile");
  if(side){
    side.innerHTML=`<div class="sidebar-profile-inner">
      <img class="avatar" src="${foto}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
      <div class="avatar avatar-fallback" style="display:none">${iniciais}</div>
      <div><strong>${escapeHTML(user.nome||"Aluno")}</strong><small>Aluno • TechAcademy</small></div>
    </div>`;
  }
  const chip=document.getElementById("user-chip");
  if(chip) chip.innerHTML=`<img src="${foto}" onerror="this.style.visibility='hidden'"><span>${escapeHTML(user.nome||"Aluno")}</span>`;
}

function carregarAluno(user){
  const xp=Number(user.xp)||0;
  const progresso=Math.min(xp/10,100);
  const cursos=Array.isArray(user.cursos)?user.cursos:[];
  const notas=Array.isArray(user.notas)?user.notas:[];
  const documentos=Array.isArray(user.documentos)?user.documentos:[];
  const media=notas.length ? (notas.reduce((s,n)=>s+Number(n.valor||0),0)/notas.length).toFixed(1) : "—";

  document.getElementById("app").innerHTML=`
    <div class="dashboard-topo">
      <div>
        <h1>Olá, ${escapeHTML(user.nome||"Aluno")} 👋</h1>
        <p>Bem-vindo de volta ao seu portal acadêmico.</p>
      </div>
      <div class="status-pill"><i></i> Matrícula ativa</div>
    </div>

    <div class="info-cards">
      <div class="info-card"><div class="info-card-top"><h3>XP TOTAL</h3><div class="card-icon">✦</div></div><span>${xp} XP</span></div>
      <div class="info-card"><div class="info-card-top"><h3>MEUS CURSOS</h3><div class="card-icon">▣</div></div><span>${cursos.length}</span></div>
      <div class="info-card"><div class="info-card-top"><h3>MÉDIA DAS NOTAS</h3><div class="card-icon">★</div></div><span>${media}</span></div>
      <div class="info-card"><div class="info-card-top"><h3>DOCUMENTOS</h3><div class="card-icon">▤</div></div><span>${documentos.length}</span></div>
    </div>

    <div class="dashboard-grid">
      <div>
        <div class="progresso-box">
          <div class="panel-heading"><h2>Seu progresso</h2><span>Jornada TechAcademy</span></div>
          <div class="progresso-meta"><span>Progresso por XP</span><strong>${Math.round(progresso)}%</strong></div>
          <div class="barra"><div class="barra-fill" style="width:${progresso}%"></div></div>
          <div class="xp-line"><span>Continue aprendendo para evoluir</span><strong>${xp} XP</strong></div>
        </div>

        <h2 class="titulo-section">🚀 Cursos disponíveis</h2>
        <div class="cursos-grid" id="cursos-disponiveis">${gerarCursosDisponiveis(user)}</div>
      </div>

      <div>
        <div class="box-dark">
          <div class="panel-heading"><h2>⭐ Minhas notas</h2><span>${notas.length} registro(s)</span></div>
          ${gerarNotas(user)}
        </div>
        <div class="box-dark" style="margin-top:16px">
          <div class="panel-heading"><h2>📄 Documentos</h2><span>Acadêmicos</span></div>
          ${gerarDocumentos(user)}
        </div>
      </div>
    </div>

    <h2 class="titulo-section">📚 Meus cursos</h2>
    <div class="cursos-grid" id="meus-cursos">${gerarCursos(user)}</div>
  `;
}

function gerarCursosDisponiveis(user){
  let html="";
  (typeof cursosDisponiveis!=="undefined"?cursosDisponiveis:[]).forEach((curso,index)=>{
    const matriculado=(user.cursos||[]).find(c=>c.id===curso.id);
    html+=`<article class="curso-card portal-item" data-search="${escapeAttr((curso.nome||"")+" "+(curso.categoria||""))}">
      <img src="${curso.imagem||""}" alt="${escapeAttr(curso.nome||"Curso")}">
      <div class="curso-info">
        <span class="categoria">${escapeHTML(curso.categoria||"CURSO")}</span>
        <h3>${escapeHTML(curso.nome||"Curso")}</h3>
        <p>${escapeHTML(curso.descricao||"")}</p>
        ${matriculado?`<button disabled>MATRICULADO</button>`:`<button onclick="matricular(${index})">MATRICULAR</button>`}
      </div>
    </article>`;
  });
  return html||`<p class="empty">Nenhum curso disponível.</p>`;
}

function matricular(index){
  const user=JSON.parse(localStorage.getItem("logado"));
  const curso=(typeof cursosDisponiveis!=="undefined")?cursosDisponiveis[index]:null;
  if(!user||!curso)return;
  const aluno=(typeof alunos!=="undefined")?alunos.find(a=>a.login===user.login):null;
  if(!aluno)return;
  aluno.cursos=aluno.cursos||[];
  if(aluno.cursos.find(c=>c.id===curso.id)){alert("Você já está matriculado.");return;}
  aluno.cursos.push(curso);
  localStorage.setItem("alunos",JSON.stringify(alunos));
  localStorage.setItem("logado",JSON.stringify(aluno));
  mostrarToast("Matrícula realizada com sucesso!");
  carregarAluno(aluno);
}

function gerarCursos(user){
  const cursos=Array.isArray(user.cursos)?user.cursos:[];
  if(!cursos.length)return `<p class="empty">Você ainda não possui cursos matriculados.</p>`;
  return cursos.map((curso,index)=>`<article class="curso-card portal-item" data-search="${escapeAttr((curso.nome||"")+" "+(curso.categoria||""))}">
    <img src="${curso.imagem||""}" alt="${escapeAttr(curso.nome||"Curso")}">
    <div class="curso-info">
      <span class="categoria">${escapeHTML(curso.categoria||"CURSO")}</span>
      <h3>${escapeHTML(curso.nome||"Curso")}</h3>
      <button onclick="abrirCurso(${index})">CONTINUAR</button>
    </div>
  </article>`).join("");
}

function abrirCurso(index){
  localStorage.setItem("cursoSelecionado",index);
  window.location.href="cursos-aluno.html";
}

function gerarNotas(user){
  const notas=Array.isArray(user.notas)?user.notas:[];
  if(!notas.length)return `<p class="empty">Nenhuma nota cadastrada.</p>`;
  return notas.map(n=>`<div class="nota-item portal-item" data-search="${escapeAttr(n.materia||"")}"><span>${escapeHTML(n.materia||"Disciplina")}</span><strong>${escapeHTML(String(n.valor??"—"))}</strong></div>`).join("");
}

function gerarDocumentos(user){
  const docs=Array.isArray(user.documentos)?user.documentos:[];
  if(!docs.length)return `<p class="empty">Nenhum documento disponível.</p>`;
  return docs.map(d=>`<p class="doc portal-item" data-search="${escapeAttr(String(d))}">📄 ${escapeHTML(String(d))}</p>`).join("");
}

function abrirPerfil(){window.location.href="perfil.html";}

function filtrarPortal(valor){
  const termo=(valor||"").toLowerCase().trim();
  document.querySelectorAll(".portal-item").forEach(el=>{
    const texto=(el.dataset.search||el.innerText||"").toLowerCase();
    el.classList.toggle("search-hidden",!!termo&&!texto.includes(termo));
  });
}

function mostrarAviso(){mostrarToast("Você está em dia. Nenhuma nova notificação.");}

function mostrarToast(msg){
  const t=document.getElementById("toast");
  if(!t)return;
  t.textContent=msg;t.style.display="block";
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>t.style.display="none",2600);
}

function sair(){
  if(confirm("Deseja sair da sua conta?")){
    localStorage.removeItem("logado");
    window.location.href="login.html";
  }
}

function escapeHTML(value){
  return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
function escapeAttr(value){return escapeHTML(value);}
