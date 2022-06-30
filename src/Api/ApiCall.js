import axios from "axios";

const URL = process.env.REACT_APP_POKEAPI;

const instance = axios.create({
  baseURL: URL,
});

export const ApiCall = async () => {
  const count = await instance
    .get(`pokemon-species`)
    .then((data) => data.data.count);
  const ability = await instance.get("ability");
  //gender
  const gender = await instance
    .get("gender")
    .then((resp) => resp.data.results)
    .then((resp) => Promise.all(resp.map((d) => axios.get(d.url))))
    .then((resp) => resp.map((d) => d.data))
    .then((resp) =>
      resp.map((data) => ({
        gender: data.name,
        pokemonOnthisGender: data.pokemon_species_details.map(
          (data) => data.pokemon_species.name
        ),
      }))
    );
  //evolution chain
  const evolutionChain = await instance.get("evolution-chain");

  //species
  const species = await instance
    .get(`pokemon-species/`)
    .then((resp) => resp.data.results)
    .then((resp) => Promise.all(resp.map((d) => axios.get(d.url))))
    .then((resp) => resp.map((d) => d.data));

  //pokemon
  const pokemon = await instance
    .get(`pokemon?limit=${count}`)
    .then((resp) => resp.data.results)
    .then((resp) => Promise.all(resp.map((d) => axios.get(d.url))))
    .then((resp) => resp.map((d) => d.data))
    .then((resp) =>
      Promise.all(
        resp.map((resp) => ({
          abilities: resp.abilities.map((d) => d.ability),
          id: resp.id,
          height: resp.height,
          moves: resp.moves,
          name: resp.name,
          order: resp.order,
          image: resp.sprites,
          stats: resp.stats,
          species: axios.get(resp.species.url).then((data) => data.data),
          type: resp.types,
          weight: resp.weigth,
        }))
      )
    );
  // .then( (resp:any) => ({
  //   ...resp,
  //   abilities: Promise.all(resp.abilities.map( (d:any) => axios.get(d.ability.url)))
  // }))

  return { ability, species, pokemon, gender, evolutionChain };
};
