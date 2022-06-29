import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Card() {
  return (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 2,
              width: "100%",
              height: 300,
            },
            xs: {
              width: "100%"
            }
          }}
        >
          <Paper elevation={1}></Paper>
        </Box>
  );
}