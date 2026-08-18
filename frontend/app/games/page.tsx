
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { listGames, createGame } from "@/lib/api"
import type { GameLobbyListing } from "@/lib/types"

export default function GamesPage() {
  const [games, setGames] = useState<GameLobbyListing[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  async function loadGames() {
    setLoading(true)
    try {
      const data = await listGames()
      setGames(data)
    } finally {
      setLoading(false)
    }
  }

  // Generate player id if one is not already present, 
  // remove this when authentication is added
  useEffect(() => {
    let playerId = localStorage.getItem("player_id")

    if (!playerId) {
      playerId = crypto.randomUUID()
      localStorage.setItem("player_id", playerId)
    }
  }, [])

  useEffect(() => {
    loadGames()
  }, [])

  async function handleCreateGame() {
    setCreating(true)
    try {
      const gameId = await createGame();
      await loadGames(); // refresh list
      window.location.href = `/games/${gameId}` //Sends the user to the newly created game
    } finally {
      setCreating(false)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Game Lobby</h1>

      <Link href="/" className="block text-blue-600 hover:underline">
        Homepage
      </Link>

      <button onClick={handleCreateGame} disabled={creating}>
        {creating ? "Creating..." : "Create Game"}
      </button>

      <hr />

      {loading ? (
        <p>Loading games...</p>
      ) : games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.game_id} style={{ marginBottom: 12 }}>
              <Link href={`/games/${game.game_id}`}>
                <strong>{game.name ?? game.game_id}</strong>
              </Link>

              <div>
                {game.players}/{game.max_players} players
                {game.started && " • In progress"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}