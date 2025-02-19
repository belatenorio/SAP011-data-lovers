import {
  filterByDirector,
  handleOrderChange,
  filterByReleaseDate,
  getCharactersForFilm,
  getTotalCharacters,
  computeStats,
  filterBySearch,
} from "../src/data.js";

import { data } from "./data.mock.js";
// Aqui, estamos definindo um conjunto de testes para algumas funções relacionadas a dados.
describe("Data functions", () => {
  // Este é um teste específico para a função 'filterByDirector'.
  it("filters films by director", () => {
    // Criamos uma simulação de dados com filmes e seus respectivos diretores.
    const dummyData = {
      films: [
        { director: "Director A" },
        { director: "Director A" },
        { director: "Director B" },
      ],
    };
    // Estamos esperando que, quando chamarmos a função 'filterByDirector' com o "Director A",
    // ela retorne apenas os filmes dirigidos por 'Director A'.
    expect(filterByDirector("Director A", dummyData)).toEqual([
      { director: "Director A" },
      { director: "Director A" },
    ]);
  });
  // teste para verificar se a função retorna todos os filmes quando não há um diretor específico selecionado.
  it("returns all films if selectByDirector is falsy", () => {
    // Aqui esperamos que, ao chamar a função 'filterByDirector' sem um diretor, ela retorne todos os filmes.
    expect(filterByDirector(null, data)).toEqual(data.films);
  });

  // Testes para handleOrderChange
  it("orders films A-Z by title", () => {
    // Criamos uma simulação de dados com filmes e seus títulos.
    const dummyData = {
      films: [{ title: "Title C" }, { title: "Title A" }, { title: "Title B" }],
    };

    // Estamos esperando que, quando ordenarmos os filmes de "A-Z" pelo título,
    // a função os retorne em ordem alfabética.
    expect(handleOrderChange("A-Z", dummyData)).toEqual([
      { title: "Title A" },
      { title: "Title B" },
      { title: "Title C" },
    ]);
  });
  //teste para verificar se os filmes são ordenados de "Z-A" pelo título.
  it("orders films Z-A by title", () => {
    const dummyData = {
      films: [{ title: "Title C" }, { title: "Title A" }, { title: "Title B" }],
    };
    // Aqui esperamos que, ao ordenar os filmes de "Z-A",
    // a função os retorne em ordem alfabética invertida.
    expect(handleOrderChange("Z-A", dummyData)).toEqual([
      { title: "Title C" },
      { title: "Title B" },
      { title: "Title A" },
    ]);
  });
  // Teste para verificar se a função retorna a lista original de filmes se a opção de ordenação for diferente de "A-Z" ou "Z-A".
  it("returns original film list if orderSelect is not A-Z or Z-A", () => {
    const dummyData = {
      films: [{ title: "Title C" }, { title: "Title A" }, { title: "Title B" }],
    };

    // Esperamos que, ao passar uma opção de ordenação diferente das conhecidas,
    // a função retorne a lista original sem modificação.
    expect(handleOrderChange("Random", dummyData)).toEqual(dummyData.films);
  });

  // Testes para filterByReleaseDate
  it("returns all films if releaseDate is falsy", () => {
    const dummyData = {
      films: [
        { release_date: "2020" },
        { release_date: "2021" },
        { release_date: "2020" },
      ],
    };
    // Se passarmos uma data de lançamento nula, esperamos que todos os filmes sejam retornados.
    expect(filterByReleaseDate(null, dummyData)).toEqual(dummyData.films);
  });

  it("filters films by release date", () => {
    const dummyData = {
      films: [
        { release_date: "2020" },
        { release_date: "2021" },
        { release_date: "2020" },
      ],
    };
    // Estamos esperando que, ao filtrar os filmes pelo ano de lançamento 2020,
    // a função retorne apenas os filmes lançados nesse ano.
    expect(filterByReleaseDate("2020", dummyData)).toEqual([
      { release_date: "2020" },
      { release_date: "2020" },
    ]);
  });

  // Teste para verificar se a função 'computeStats' calcula corretamente a porcentagem de personagens em um filme.  it("computes character percentage for film", () => {
  expect(computeStats("1", data)).toBe("33.33");
});
// Verifica se a função 'getTotalCharacters' retorna o número correto de personagens totais.
it("get total characters, must return 6", () => {
  // Aqui esperamos que o total de personagens seja 6.
  expect(getTotalCharacters(data)).toBe(6);
});
// Teste para garantir que a função 'getTotalCharacters' não retorna um valor incorreto.
it("get total characters, don't must return 1", () => {
  // Esperamos que o total de personagens não seja 1.
  expect(getTotalCharacters(data)).not.toBe(1);
});
// Verifica se a função 'getCharactersForFilm' retorna o número correto de personagens para um filme específico.
it("get characters for film 1, must return 2", () => {
  // Esperamos que o filme com id "1" tenha 2 personagens.
  expect(getCharactersForFilm("1", data)).toBe(2);
});
it("returns 0 for characters if filmId is null", () => {
  // Se passarmos um ID de filme nulo, esperamos que a função retorne 0.
  expect(getCharactersForFilm(null, data)).toBe(0);
});
it("returns 0 for characters if filmId is an empty string", () => {
  // Se passarmos uma string vazia como ID do filme, esperamos que a função retorne 0.
  expect(getCharactersForFilm("", data)).toBe(0);
});
// Teste para verificar se a função retorna 0 para um filme que não existe.
it("returns 0 for characters of a non-existent film", () => {
  // Se tentarmos pegar personagens para um filme com id "100" (que não existe nos dados de teste),
  // esperamos que a função retorne 0.
  expect(getCharactersForFilm("100", data)).toBe(0);
});

// Testes para filterBySearch para verificar se a função retorna os filmes com correspondência exata de título.
const dummyData = {
  films: [{ title: "Film 1" }, { title: "Film 2" }, { title: "Film 3" }],
};

describe("filterBySearch function", () => {
  it("should return films with exact title match", () => {
    const result = filterBySearch("Film 3", dummyData);
    expect(result).toEqual([{ title: "Film 3" }]);
  });
  // Teste para verificar se a função retorna um array vazio se não houver correspondência de título.
  it("should return an empty array if there is no title match", () => {
    const result = filterBySearch("Film 4", dummyData);
    expect(result).toEqual([]);
  });
  // Teste para verificar se a função retorna filmes mesmo se o texto de pesquisa estiver em maiúsculas ou minúsculas diferentes.
  it("should return films even if the search text is in different case", () => {
    const result = filterBySearch("Film 1", dummyData);
    expect(result).toEqual([{ title: "Film 1" }]);
  });
  // Teste para verificar se a função retorna todos os filmes se o texto de pesquisa estiver vazio.
  it("should return all array of films if search text is empty", () => {
    const result = filterBySearch("", dummyData);
    expect(result).toEqual(dummyData.films);
  });
});
