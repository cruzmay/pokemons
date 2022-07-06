import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { PokeReducers } from '../reducers/PokeReducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  PokeReducers,
  composeEnhancers(applyMiddleware(thunk))
);