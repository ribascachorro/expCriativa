import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Paper } from "@mui/material";

const PlayerDetail = () => {
  const { id } = useParams();  // Captura o ID do jogador da URL
  const [player, setPlayer] = useState(null);  // Estado para armazenar os dados do jogador
  const navigate = useNavigate();  // Para navegação

  useEffect(() => {
    console.log("ID do jogador:", id);  // Verifica o ID capturado da URL

    fetch(`http://localhost:8800/player/${id}`)
      .then((response) => {
        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
          throw new Error("Jogador não encontrado ou erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Jogador encontrado:", data);  // Adicionando log para depuração
        setPlayer(data);  // Armazena os dados do jogador
      })
      .catch((error) => {
        console.error("Erro ao carregar detalhes do jogador:", error);
      });
  }, [id]);

  const goHome = () => {
    navigate("/");  // Redireciona para a página inicial
  };

  return (
    <Container>
      {player ? (
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h4">{player.jogador}</Typography>
          <Typography variant="h6" color="textSecondary">
            ID: {player.idinscricao}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            <strong>Time:</strong> {player.time}
          </Typography>
          <Typography variant="body1">
            <strong>Posição:</strong> {player.posicao}
          </Typography>
          <Typography variant="body1">
            <strong>Gols:</strong> {player.gols}
          </Typography>
          <Typography variant="body1">
            <strong>Assistências:</strong> {player.assistencias}
          </Typography>

          <Button variant="contained" color="primary" onClick={goHome} style={{ marginTop: "20px" }}>
            Voltar para a Página Inicial
          </Button>
        </Paper>
      ) : (
        <Typography>Carregando detalhes do jogador...</Typography>
      )}
    </Container>
  );
};

export default PlayerDetail;