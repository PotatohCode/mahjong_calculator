import { Link } from 'react-router-dom';
import { Box, Button } from "@mui/material";

import './App.css'

export default function App() {
  return (
    <Box sx={{display: "grid", gap: 2}}>
      <Link to='/creategame'>
        <Button variant="contained">New Game</Button>
      </Link>
      <Link to='/addplayer'>
        <Button variant="contained">Add Player</Button>
      </Link>
      <Link to='/gamelist'>
        <Button variant="contained">Games</Button>
      </Link>
      {/* <Link to='/players'>
        <Button variant="contained">Players</Button>
      </Link> */}
    </Box>
  )
}
