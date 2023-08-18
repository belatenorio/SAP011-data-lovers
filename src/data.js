// estas funciones son de ejemplo

// export const example = () => {
//   return 'example';
// };

// export const anotherExample = () => {
//   return 'OMG';
// };

export function filterByDirector(selectByDirector, data) {
  if (!selectByDirector) return data.films;

  const filteredFilmsByDirector = data.films.filter((film) => {
    return film.director === selectByDirector;
  });

  return filteredFilmsByDirector;
}

// Função que retorna um novo array de filmes filtrados com base no diretor selecionado
function getFilteredFilms() {
  const selectByDirector = directorSelect.value;

  if (selectByDirector) {
    return data.films.filter((film) => film.director === selectByDirector);
  } else {
    return data.films;
  }
}

export function handleOrderChange(orderSelect, data) {
  const sortedFilms = data.films.slice(); // Copia o array original para não modificá-lo diretamente

  if (orderSelect === "A-Z") {
    sortedFilms.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (orderSelect === "Z-A") {
    sortedFilms.sort(function (a, b) {
      return b.title.localeCompare(a.title);
    });
  }
  return sortedFilms;
}

// Função que calcula a porcentagem de personagens de um filme específico. Esta função, calcula o total de personagens em todos os filmes presentes nos dados fornecidos.
function getTotalCharacters(data) {
  return data.films.reduce((acc, film) => acc + film.people.length, 0);
}
// Essa função procura o filme com o ID correspondente na lista de filmes (data.films) e verifica se o filme foi encontrado. Se o filme for encontrado, ele retorna o número de personagens desse filme (film.people.length), caso contrário, retorna 0.
function getCharactersForFilm(filmId, data) {
  const film = data.films.find((f) => f.id === filmId);
  return film ? film.people.length : 0;
}

// Essa função recebe o ID de um filme (filmId) e os dados completos. Primeiro, ela calcula o número total de personagens em todos os filmes usando a função getTotalCharacters. Em seguida, ela obtém o número de personagens para o filme específico usando a função getCharactersForFilm. Depois, ela calcula a porcentagem de personagens desse filme em relação ao total de personagens de todos os filmes. O resultado é multiplicado por 100 para obter a porcentagem, e toFixed(2) é usado para limitar o resultado a duas casas decimais.
export function computeStats(filmId, data) {
  const totalCharacters = getTotalCharacters(data);
  const charactersForFilm = getCharactersForFilm(filmId, data);
  const percentage = (charactersForFilm / totalCharacters) * 100;
  return percentage.toFixed(2);
}
