import { example } from "./data.js";
// import data from './data/lol/lol.js';
import data from "./data/ghibli/ghibli.js";
// import data from './data/rickandmorty/rickandmorty.js';

function createFilmItem(film) {
  const filmItem = `
    <div class="film-item">
        <div class="film-item-front">
            <img src="${film.poster}" class="film-poster">
            <h3>${film.title}</h3>
        </div>
        <div class="film-item-back hide">
            <p>${film.release_date}</p>
        </div>
    </div>
  `;

  return filmItem;
}

const listFilms = data.films.map((film) => {
  const templateItem = createFilmItem(film);

  return templateItem;
});

document.querySelector("#list").innerHTML = listFilms.join("");

// Preenchendo as opções do campo de seleção com os nomes dos diretores
const directorsSelect = document.querySelector("#director");

const uniqueDirectors = [...new Set(data.films.map((film) => film.director))];

uniqueDirectors.forEach((director) => {
  const option = document.createElement("option");
  option.value = director;
  option.textContent = director;
  directorsSelect.appendChild(option);
});

const uniqueYears = [
  ...new Set(data.films.map((film) => film.release_date)),
].sort((a, b) => b - a); // Ordenando anos de forma decrescente

uniqueYears.forEach((release_date) => {
  const option = document.createElement("option");
  option.value = release_date;
  option.textContent = release_date;
  document.querySelector("#release_date").appendChild(option);
});

function getSortedFilms(films, order) {
  switch (order) {
    case "az":
      return films.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return films.sort((a, b) => b.title.localeCompare(a.title));
    case "asc_year":
      return films.sort(
        (a, b) => parseInt(a.release_date) - parseInt(b.release_date)
      );
    case "desc_year":
      return films.sort(
        (a, b) => parseInt(b.release_date) - parseInt(a.release_date)
      );
    default:
      return films; // sem ordenação
  }
}

function displayFilms() {
  const selectedDirector = document.querySelector("#director").value;
  const selectedYear = document.querySelector("#release_date").value;
  const order = document.querySelector("#order").value;

  let filmsToDisplay = data.films;

  filmsToDisplay = filmsToDisplay.filter((film) =>
    selectedDirector !== "all" ? film.director === selectedDirector : true
  );

  filmsToDisplay = filmsToDisplay.filter((film) =>
    selectedYear !== "all" ? film.release_date === selectedYear : true
  );

  filmsToDisplay = getSortedFilms(filmsToDisplay, order);

  const filmItems = filmsToDisplay.map(createFilmItem);
  document.querySelector("#list").innerHTML = filmItems.join("");
}

// Mostrar todos os filmes quando a página carrega
displayFilms();

directorsSelect.addEventListener("change", displayFilms);
document
  .querySelector("#release_date")
  .addEventListener("change", displayFilms);
document.querySelector("#order").addEventListener("change", displayFilms);
