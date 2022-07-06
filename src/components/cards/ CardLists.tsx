import React from "react";
import Card from "./Cards";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Pokemon, State } from "../../interfaces/interfaces";

export const CardLists = () => {
  const pokemon: Pokemon[] = useSelector((state: State) => state.list.pokemon);

  return (
    <Grid container spacing={0}>
      {pokemon.map((data: Pokemon, i) => (
        <Grid item xs={12} sm={6} lg={3} xl={2} key={i}>
          <Card {...data} />
        </Grid>
      ))}
    </Grid>
  );
};
