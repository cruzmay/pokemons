import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Pokemon } from "../../interfaces/interfaces";

export default function Card({ name, image }: Pokemon) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          width: "100%",
          height: 300,
        },
        xs: {
          width: "100%",
        },
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "50%", md: "70%" },
          }}
        >
          <img src={image} alt={name} style={{ width: "70%" }} />
        </Box>
        <h1>{name}</h1>
      </Paper>
    </Box>
  );
}
