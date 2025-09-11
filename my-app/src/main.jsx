import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// css
import './index.css'
// pages
import App from './App.jsx'
import Home from "./pages/Home.jsx";
import CreateGame from './pages/CreateGame.jsx';
import AddPlayer from './pages/AddPlayer.jsx';
import GameList from './pages/GamesList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home' element={<Home />} />
        <Route path='/creategame' element={<CreateGame />} />
        <Route path='/addplayer' element={<AddPlayer />} />
        <Route path='/gamelist' element={<GameList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
