import { Types } from "../types/types";

export const setPokemons = (payload: any) => ({
  type: Types.GET__POKEMON,
  payload,
});


