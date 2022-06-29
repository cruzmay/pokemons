import React from 'react'
import Card from './Cards'
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';

export const  CardLists = () => {

    const pokemons = new Array(60).fill("")

  return (
         <Grid container spacing={1}>
                 {
                    pokemons.map( (data, i) => (
                    <Grid item xs={12} sm={6} lg={3} xl={2} key={i}>
                        <Card/> 
                    </Grid>
                    ))
                }   
         </Grid>
  )
}
