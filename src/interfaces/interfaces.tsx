export interface Species {
  base_happiness: Number;
  capture_rate: Number;
  color: string;
  desc_en: string;
  desc_es: string;
  evolution: string;
  evolution_id: Number;
  habitat: string;
  has_gender_differences: Boolean;
  is_baby: Boolean;
  is_legendary: Boolean;
  is_mythical: Boolean;
}

export interface Stats {
  base_stat: Number;
  effort: Number;
  stat: string;
}

export interface Pokemon {
  abilities: Number[];
  height: Number;
  id: Number | string | undefined;
  image: string;
  name: string;
  order: Number;
  species: Species;
  stats: Stats;
  types: string[];
  weight: Number;
}

export interface PokemonOnthisGender {
  gender_id: Number;
  name: string;
}

export interface Gender {
  gender: string;
  pokemonOnthisGender: PokemonOnthisGender;
}

export interface EvolutionChain {
  evol_1_id: Number | any;
  evol_2_id: Number | any;
  evol_3_id: Number | any;
  evol_4_id: Number | any;
  evol_id: Number | any;
}

export interface Ability {}

export interface List {
  ability: Ability[];
  evolutionChain: EvolutionChain[];
  gender: Gender[];
  pokemon: Pokemon[];
}

export interface State {
  loading: Boolean;
  list: List;
}
