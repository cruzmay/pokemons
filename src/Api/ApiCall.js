import { chainPropTypes } from "@mui/utils";
import axios from "axios";

const URL = process.env.REACT_APP_POKEAPI;
const URL_LONG = URL.length;

const instance = axios.create({
  baseURL: URL,
});

export const ApiCall = async () => {
  const count = await instance
    .get(`pokemon-species`)
    .then((data) => data.data.count);

  //ability
  const ability = await instance
    .get("ability?limit=327")
    .then((resp) => resp.data.results)
    .then((resp) => Promise.all(resp.map((data) => axios.get(data.url))))
    .then((resp) => resp.map((data) => data.data))
    .then((resp) =>
      resp.map((data) => ({
        ability_id: data.id,
        en_name: data.name,
        ability_desc_en: data.flavor_text_entries.find(
          (d) => d.language.name === "en"
        ),
        ability_desc_es: data.flavor_text_entries.find(
          (d) => d.language.name === "es"
        ),
        es_name: data.names.find((d) => d.language.name === "es"),
      }))
    );

  //gender
  const gender = await instance
    .get("gender")
    .then((resp) => resp.data.results)
    .then((resp) => Promise.all(resp.map((d) => axios.get(d.url))))
    .then((resp) => resp.map((d) => d.data))
    .then((resp) =>
      resp.map((data) => ({
        gender: data.name,
        pokemonOnthisGender: data.pokemon_species_details.map((data) => ({
          name: data.pokemon_species.name,
          gender_id: parseInt(
            data.pokemon_species.url
              .slice(URL_LONG)
              .match(/\d+/g)
              .reduce((a, b) => a + b)
          ),
        })),
      }))
    );

  //evolution chain
  const evolutionChain = await instance
    .get("evolution-chain?limit=468")
    .then((resp) => resp.data.results)
    .then((resp) => Promise.all(resp.map((data) => axios.get(data.url))))
    .then((resp) => resp.map((data) => data.data))
    .then((resp) =>
      resp.map((data) => ({
        // ...data,
        evol_id: data.id,
        evol_1_id: parseInt(
          data.chain.species?.url
            .slice(URL_LONG)
            .match(/\d+/g)
            .reduce((a, b) => a + b)
        ),
        evol_2_id: parseInt(
          data.chain.evolves_to[0]?.species.url
            .slice(URL_LONG)
            .match(/\d+/g)
            .reduce((a, b) => a + b)
        ),
        evol_3_id: parseInt(
          data.chain.evolves_to[0]?.evolves_to[0]?.species.url
            .slice(URL_LONG)
            .match(/\d+/g)
            .reduce((a, b) => a + b)
        ),
        evol_4_id: parseInt(
          data.chain.evolves_to[0]?.evolves_to[0]?.evolves_to[0]?.species.url
            .slice(URL_LONG)
            .match(/\d+/g)
            .reduce((a, b) => a + b)
        ),
      }))
    );

  //pokemon and species
  const pokemon = await instance
    .get(`pokemon?limit=${count}`)
    .then((resp) => resp.data.results)
    .then((resp) => Promise.all(resp.map((d) => axios.get(d.url))))
    .then((resp) => resp.map((d) => d.data))
    .then((resp) =>
      Promise.all(
        resp.map(async (resp) => {
          return {
            abilities: resp.abilities.map((d) =>
              parseInt(
                d.ability?.url
                  .slice(URL_LONG)
                  .match(/\d+/g)
                  .reduce((a, b) => a + b)
              )
            ),
            id: resp.id,
            height: resp.height,
            // moves: resp.moves.map((resp) => resp.move),
            name: resp.name,
            order: resp.order,
            image: resp.sprites.other?.["official-artwork"].front_default,
            stats: resp.stats.map((resp) => ({
              stat: resp.stat.name,
              base_stat: resp.base_stat,
              effort: resp.effort,
            })),
            species: await axios
              .get(resp.species.url)
              .then((resp) => resp.data)
              .then(async (resp) => ({
                base_happiness: resp.base_happiness,
                capture_rate: resp.capture_rate,
                color: resp.color.name,
                evolution_id: parseInt(
                  resp.evolution_chain?.url
                    .slice(URL_LONG)
                    .match(/\d+/g)
                    .reduce((a, b) => a + b)
                ),
                evolution: resp.evolution_chain?.url,
                desc_en: resp.flavor_text_entries.find(
                  (resp) => resp.language.name === "en"
                )?.flavor_text,
                desc_es: resp.flavor_text_entries.find(
                  (resp) => resp.language.name === "es"
                )?.flavor_text,
                habitat: resp.habitat?.name,
                has_gender_differences: resp.has_gender_differences,
                is_baby: resp.is_baby,
                is_legendary: resp.is_legendary,
                is_mythical: resp.is_mythical,
              })),
            types: resp.types.map((resp) => resp.type.name),
            weight: resp.weight,
          };
        })
      )
    );

  return { ability, pokemon, gender, evolutionChain };
};
