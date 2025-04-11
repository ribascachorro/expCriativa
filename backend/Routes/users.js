import express from "express";
import { getPlayers, createPlayer, updatePlayer, deletePlayer, getPlayer } from "../Controllers/users.js"; 

const router = express.Router();

router.get("/players", getPlayers);
router.post("/player", createPlayer);
router.put("/player/:id", updatePlayer);
router.delete("/player/:id", deletePlayer);
router.get("/player/:id", getPlayer);  // Rota para buscar um jogador específico

export default router;
