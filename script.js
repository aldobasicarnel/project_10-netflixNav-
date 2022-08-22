const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");
const nav = document.querySelectorAll(".nav");
const form = document.getElementById("form");
const search = document.getElementById("input");
const main = document.getElementById("main");

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7393fd846d14b50541d887099fc8eac6&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=7393fd846d14b50541d887099fc8eac6&query='";

openBtn.addEventListener("click", () => {
  nav.forEach((navEl) => navEl.classList.add("visible"));
});

closeBtn.addEventListener("click", () => {
  nav.forEach((navEl) => navEl.classList.remove("visible"));
});

const getMovies = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showMovies(data.results));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

const showMovies = (movies) => {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");
    movieEL.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="movie_jpg" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;

    main.appendChild(movieEL);
  });
};

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return "green";
  } else {
    return "red";
  }
};

getMovies(API_URL);
