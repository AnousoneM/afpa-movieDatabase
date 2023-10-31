// Je définis une constante qui contiendra mes infos de connexion à l'API TMDB
const optionsTMDB = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTdjYzc0OTU1MTQ5YmUyM2RmODM4MTNmMjAxYTRlOCIsInN1YiI6IjYyODM5OGJiZWM0NTUyMTAzMmE5NTcxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.REF4Oi-K06F7Jq8LolG5vPQtyeiGk3nBFdDyL1FLq7E'
  }
};

// j'écoute l'événement click sur le bouton btnSearch, qui lancera une fonction
document.getElementById('btnSearch').addEventListener('click', function () {
  // je défini une constante pour faciliter la manipulation de l'élément
  const movieList = document.querySelector(".movie-list");

  // je vide mon élément HTML avant de créer les cards
  movieList.innerHTML = ""

  // je récupère ce qui a été renseigné dans l'input correspondant
  let movieSearch = document.querySelector('#inputMovie').value
  
  // J'effectuer un fetch pour récupérer les données de l'API TMDB
  fetch(`https://api.themoviedb.org/3/search/movie?query=${movieSearch}&include_adult=false&language=fr-FR&page=1`, optionsTMDB)
    .then(response => response.json())
    .then(data => {
      // je pense à cibler data.results en raison du format du fichier récupéré
      for (let movie of data.results) {
        // Je crée un élément div
        const card = document.createElement('div')
        // Je lui rajoute des classes bootstrap
        card.classList.add('card','col-lg-2','col-12','m-2')
        // Je rajoute des élements via innerHTML
        card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="card-img-top mt-3" alt="affiches films">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.release_date}</p>
          <a href="movie.html?id=${movie.id}" class="btn btn-secondary view-more">Voir Plus</a>
        </div>
        `
        // j'utilise appendChild pour ajouter l'élément à l'endroit ciblé
        movieList.appendChild(card);
      }
    })
})



