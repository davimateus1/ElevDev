const totalRepos = 4; // Total de repositórios que eu desejo exibir na tela
const api = "https://api.github.com/users"; // URL da API pública do Github

// Chaves fornecidas pelo Oauth do Github
const client_id = "077842a3549e8732ff2c";
const client_secret = "c364847f79843127f66c7261ecf5f4022f5754f6";

// usando o DOM para conseguir os ID's do HTML
const busca = document.getElementById("pesquisar");
const perfil = document.getElementById("perfil");

async function getUsuario(usuario) {
  // Pegando os dados e transformando em um JSON
  const respostaPerfil = await fetch(
    `${api}/${usuario}?client_id=${client_id}&client_secret=${client_secret}`
  );

  const repostaRepositorio = await fetch(
    `${api}/${usuario}/repos?per_page=${totalRepos}&client_id=${client_id}&client_secret=${client_secret}`
  );

  const perfil = await respostaPerfil.json();
  const repositorios = await repostaRepositorio.json();

  return { perfil, repositorios };
}

function mostrarPerfil(usuario) {
  // mostrar dados do perfil utilizando a propriedade innerHTML do DOM
  perfil.innerHTML = `
      <div class="row">
      <div class="col-md-6">
        <div class="card border-success mb-3 mx-auto list-group-item-success" style="width: 17.7rem;">
           <img class="card-img-top rounded-circle border border-success" src="${usuario.avatar_url}"/>
           <ul class="list-group list-group-flush">
             <li class="list-group-item text-center border-success list-group-item-warning"><span class="badge text-center" style="font-size: 20px; color:black;">${usuario.name}</span></li>
             <li class="list-group-item text-center border-success list-group-item-warning">Repositórios: <span class="badge badge-warning text-center">${usuario.public_repos}</span></li>
             <li class="list-group-item text-center border-success list-group-item-warning">Seguidores: <span class="badge badge-warning text-center">${usuario.followers}</span></li>
             <li class="list-group-item text-center border-success list-group-item-warning">Seguindo: <span class="badge badge-warning text-center">${usuario.following}</span></li>
           </ul>
           <div class="card-body">
             <a href="${usuario.html_url}" class="btn btn-outline-success btn-block list-group-item-success" target="_blank"> Ver perfil </a>
           </div>
        </div>
      </div>
     <div class="col-md-4">
     <div id="repositorios"></div>
     </div>
    </div>`;
}

function mostrarRepos(repositorios) { // mostrar os repositorios utilizando a propriedade innerHTML do DOM

  let saidaRepos = "";

  repositorios.forEach((repo) => {
    saidaRepos += `
            <div class="card card-body mb-1 border border-success list-group-item-action list-group-item-success">
                <div class="row">
                    <div class="col-md-10">
                        <a href="${repo.html_url}" target="_blank" class="font-weight-bold text-decoration: none">${repo.name}</a>
                    </div>
                    <div class="col-md-6 float-right">
                        <span class="badge badge-warning">⭐ Estrelas: ${repo.stargazers_count}</span>
                        <span class="badge badge-primary">🧑‍🤝‍🧑 Acompanhantes: ${repo.watchers_count}</span>
                        <span class="badge badge-dark">🔗 Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>
        `;
  });

  document.getElementById("repositorios").innerHTML = saidaRepos;
  /*pegando o "saidaRepos", concatenando e usando o DOM para pegar o ID "repositorios" na função mostrarPerfil() */
}

busca.addEventListener("keyup", (e) => {  // Capturando o evento de digitação da barra

  const usuario = e.target.value;

  if (usuario.length > 0) { // se tiver mais de um caractere, a busca pelo perfil é iniciada, e após isso é mostrada
 
    getUsuario(usuario).then((res) => {
      mostrarPerfil(res.perfil);
      mostrarRepos(res.repositorios);
    });
  }
});
