import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  
import { List, ListItem, ListItemText } from "@mui/material";

const DataList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/players")  
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Erro ao carregar jogadores:", error));
  }, []);

  return (
    <div className="data-list-container">
      <h1 className="data-list-title">Jogadores Série B</h1>
      <List className="data-list">
        {players.length > 0 ? (
          players.map((player) => (
            <ListItem 
              key={player.idinscricao}
              className="data-list-item"
            >
              <ListItemText
                className="data-list-text"
                primary={
                  <Link 
                    to={`/detail/${player.idinscricao}`}
                    className="data-list-link"
                  >
                    {player.jogador}
                  </Link>
                }  
                secondary={`ID: ${player.idinscricao}`}
              />
            </ListItem>
          ))
        ) : (
          <p className="loading-message">Carregando jogadores...</p>
        )}
      </List>
    </div>
  );
};

export default DataList;