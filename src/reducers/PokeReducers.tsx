import { Types } from "../types/types";

interface InitialState {
  loading: boolean;
  list: any[];
}

const initialState: InitialState = {
  loading: true,
  list: [],
};

export interface pokeReducers {
  payload: any;
  type: any;
  state: any[];
  action: any;
}

export const PokeReducers = (state = initialState, action: pokeReducers) => {
  switch (action.type) {
    case Types.GET__POKEMON:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};


