const containerVideo = document.querySelector('.videos__container');
const barraDePesquisa = document.querySelector(".pesquisar__input");
const btnCategoria = document.querySelectorAll('.superior__item');

async function buscarEMostrarVideos(){
    
    try{
        const buscar =  await fetch("http://localhost:3000/videos"); 
        const videos = await buscar.json();

        videos.forEach((video) => {
            if (video.categoria == ""){
                throw new Error('Esse video não tem categoria');
            }
            containerVideo.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title= "${video.titulo} frameborder= "0" allowfullscreen></iframe>
                        <div class="descricao-video">
                            <img class="img-canal" src="${video.imagem}" alt="Logo canal">
                            <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                            <p class="categoria" hidden>${video.categoria}</p>
                        </div>
                </li>
                `; 
            })
    } catch(error){
        containerVideo.innerHTML = `<p>Houve um error ao carregar: ${error}</p>`
    }
}
 
buscarEMostrarVideos();




barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();
  
    videos.forEach((video) => {
      const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
  
      video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
  }
  
btnCategoria.forEach( botao =>{
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click',() => filtrarCategoria(nomeCategoria));

})

function filtrarCategoria(filtro){
    const videos = document.querySelectorAll('.videos__item');
    const filtroValor = filtro.toLowerCase();

    videos.forEach((video) =>{
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();

        if (!categoria.includes(filtroValor) && filtroValor != 'tudo'){
            video.style.display = 'none';
        } else{
            video.style.display = 'block';
        }

    })
}
