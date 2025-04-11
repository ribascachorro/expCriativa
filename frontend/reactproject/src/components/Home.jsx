import React from "react";
import { Link } from "react-router-dom";  
import { Container, Typography, Button } from "@mui/material";

// Caminho para a imagem
import Image from "../Campeonato_Brasileiro_de_Futebol_Série_B_2022.png";

// Importa o arquivo App.css
import "../App.css";

const Home = () => {
  return (
    <Container>
      <div className="home-title">Felipe Ribas Boaretto</div>
      <div className="home-subtitle">Série B - Jogadores</div>

      <div className="home-image-container">
        <img
          src={Image}
          className="home-image"
        />
      </div>

      <div className="home-buttons">
        <Button variant="contained" color="primary" component={Link} to="/list">
          Listagem de Jogadores
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/create" style={{ marginLeft: "10px" }}>
          Cadastro de Jogadores
        </Button>
      </div>
    </Container>
  );
};

export default Home;