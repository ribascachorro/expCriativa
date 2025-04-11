import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";  // Tela inicial
import DataList from "./components/DataList";  // Tela de listagem de jogadores
import PlayerForm from "./components/PlayerForm";  // Tela de cadastro/edição
import PlayerDetail from "./components/PlayerDetail";  // Tela de detalhes do jogador

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<DataList />} />
        <Route path="/create" element={<PlayerForm />} />
        <Route path="/edit/:id" element={<PlayerForm />} />  
        <Route path="/detail/:id" element={<PlayerDetail />} />  
      </Routes>
    </Router>
  );
}

export default App;