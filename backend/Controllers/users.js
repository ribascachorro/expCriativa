import { db } from "../db.js";

// Obter todos os jogadores
export const getPlayers = (_, res) => {
  const q = "SELECT idinscricao, time, jogador, posicao, gols, assistencias FROM serieb";  
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

//criar um novo jogador
export const createPlayer = (req, res) => {
  const { time, jogador, posicao, gols, assistencias } = req.body;

  // Consulta SQL para inserir o novo jogador
  const query = "INSERT INTO serieb (time, jogador, posicao, gols, assistencias) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [time, jogador, posicao, gols, assistencias], (err, result) => {
    if (err) {
      console.error("Erro ao inserir jogador:", err); // Exibe o erro no console
      return res.status(500).json({ error: "Erro ao cadastrar jogador" });  // Retorna o erro 500
    }
    return res.status(201).json({ message: "Jogador cadastrado com sucesso", playerId: result.insertId });
  });
};

export const updatePlayer = (req, res) => {
  const id = req.params.id;  // Obtém o id do jogador da URL
  const { time, jogador, posicao, gols, assistencias } = req.body;  // Obtém os dados do corpo da requisição

  const q = "UPDATE serieb SET time = ?, jogador = ?, posicao = ?, gols = ?, assistencias = ? WHERE idinscricao = ?";
  const values = [time, jogador, posicao, gols, assistencias, id];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar jogador:", err);
      return res.status(500).json({ error: "Erro ao atualizar jogador." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Jogador não encontrado." });
    }

    return res.status(200).json("Jogador atualizado com sucesso.");
  });
};


// Deletar um jogador
export const deletePlayer = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM serieb WHERE idinscricao = ?";

  db.query(q, [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Jogador removido com sucesso.");
  });
};

export const getPlayer = (req, res) => {
  const { id } = req.params;  // Captura o ID do jogador da URL
  const query = "SELECT * FROM serieb WHERE idinscricao = ?";  // Consulta para encontrar o jogador

  db.query(query, [id], (err, data) => {
    if (err) {
      console.error("Erro ao buscar jogador:", err);
      return res.status(500).json({ error: "Erro ao buscar jogador" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Jogador não encontrado" });  // Caso o jogador não seja encontrado
    }
    return res.status(200).json(data[0]);  // Retorna o primeiro jogador encontrado
  });
};
