import axios from "axios";

const URL = process.env.REACT_APP_POKEAPI;

const instance = axios.create({
  baseURL: URL,
});

export const ApiGate = () => {
  const pokemons = instance
    .get("pokemon?limit=905")
    .then((data) => data.data)
    .then((data) =>
      Promise.all(data.results.map((data) => axios.get(data.url)))
    )
    .then((data) => data.map((resp) => resp.data));
  return pokemons;
};
