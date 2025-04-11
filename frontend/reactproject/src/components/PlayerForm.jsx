import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Snackbar, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PlayerForm = () => {
  const [player, setPlayer] = useState({
    time: "",
    jogador: "",
    posicao: "",
    gols: 0,
    assistencias: 0,
  });
  const [playersList, setPlayersList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null); // Track which player is being edited

  // Load players list
  useEffect(() => {
    fetch("http://localhost:8800/players")
      .then((response) => response.json())
      .then((data) => setPlayersList(data))
      .catch((error) => console.error("Erro ao carregar jogadores:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If we're in edit mode (editingId is set)
    if (editingId) {
      updatePlayer(editingId);
      return;
    }

    // Otherwise, create new player
    fetch("http://localhost:8800/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(player),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage("Jogador cadastrado com sucesso!");
        setTimeout(() => {
          navigate("/list");
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao salvar jogador:", error);
        setSuccessMessage("Erro ao salvar jogador.");
      });
  };

  const updatePlayer = (playerId) => {
    fetch(`http://localhost:8800/player/${playerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(player),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage("Jogador atualizado com sucesso!");
        setEditingId(null); // Exit edit mode
        // Refresh the players list
        return fetch("http://localhost:8800/players");
      })
      .then((response) => response.json())
      .then((data) => setPlayersList(data))
      .catch((error) => {
        console.error("Erro ao atualizar jogador:", error);
        setSuccessMessage("Erro ao atualizar jogador.");
      });
  };

  const handleDelete = (playerId) => {
    fetch(`http://localhost:8800/player/${playerId}`, {
      method: "DELETE",
    })
      .then(() => {
        setSuccessMessage("Jogador deletado com sucesso!");
        // Refresh the players list
        return fetch("http://localhost:8800/players");
      })
      .then((response) => response.json())
      .then((data) => setPlayersList(data))
      .catch((error) => console.error("Erro ao deletar jogador:", error));
  };

  const handleEdit = (player) => {
    setPlayer(player); // Fill form with player data
    setEditingId(player.idinscricao); // Set the ID we're editing
  };

  const cancelEdit = () => {
    setPlayer({
      time: "",
      jogador: "",
      posicao: "",
      gols: 0,
      assistencias: 0,
    });
    setEditingId(null); // Clear edit mode
  };

  return (
    <Container>
      <Typography variant="h4">
        {editingId ? "Editar Jogador" : "Cadastrar Jogador"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Time"
          name="time"
          value={player.time}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Jogador"
          name="jogador"
          value={player.jogador}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Posição"
          name="posicao"
          value={player.posicao}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Gols"
          name="gols"
          value={player.gols}
          onChange={handleChange}
          fullWidth
          type="number"
          required
        />
        <TextField
          label="Assistências"
          name="assistencias"
          value={player.assistencias}
          onChange={handleChange}
          fullWidth
          type="number"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {editingId ? "Salvar Alterações" : "Cadastrar Jogador"}
        </Button>

        {editingId && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={cancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Cancelar Edição
          </Button>
        )}
      </form>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Jogadores Cadastrados:
      </Typography>
      <List>
        {playersList.map((playerItem) => (
          <ListItem key={playerItem.idinscricao}>
            <ListItemText
              primary={playerItem.jogador}
              secondary={`Time: ${playerItem.time} | Posição: ${playerItem.posicao}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEdit(playerItem)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(playerItem.idinscricao)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={!!successMessage}
        message={successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage("")}
      />
    </Container>
  );
};

export default PlayerForm;