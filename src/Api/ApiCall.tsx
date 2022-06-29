import axios from "axios";
import { AnyRecord } from "dns";

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

export const ApiCall = async () => {
  const count = await instance.get(`pokemon`).then(data => data.data.count);
  const ability = await instance.get('ability')
  //gender
  const gender = await instance.get('gender')
    .then(resp => resp.data.results)
    .then(resp => Promise.all(resp.map( (d: any) => axios.get(d.url) )))
    .then(resp => resp.map( d => d.data))
    .then(resp => resp.map( data => ({
      gender: data.name,
      pokemonOnthisGender: data.pokemon_species_details.map( (data:any) => data.pokemon_species.name)
    })))
  //evolution chain
  const evolutionChain = await instance.get('evolution-chain')
  const pokemon = await instance.get(`pokemon?limit=${count}`)
    .then( resp => resp.data.results)
    .then( resp => Promise.all( resp.map( (d:any) => axios.get(d.url) ) ))
    .then(resp => resp.map(d => d.data ))
    .then(resp => resp.map( resp => ({
        abilities: resp.abilities.map((d:any )=> d.ability.url),
        id: resp.id,
        height: resp.height,
        moves: resp.moves,
        name: resp.name,
        order: resp.order,
        species: resp.species,
        image: resp.sprites,
        stats: resp.stats,
        type: resp.types,
        weight: resp.weigth
    })))
    // .then( (resp:any) => ({
    //   ...resp,
    //   abilities: Promise.all(resp.abilities.map( (d:any) => axios.get(d.ability.url)))
    // }))

  return { ability, pokemon, gender, evolutionChain };
};
