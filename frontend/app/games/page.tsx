
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { listGames } from "@/lib/api"
import type { GameLobbyListing } from "@/lib/types"
import CreateFormModal from "@/components/CreateFormModal"

export default function GamesPage() {
  const [games, setGames] = useState<GameLobbyListing[]>([])
  const [loading, setLoading] = useState(true)

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

  // old create game function that redirected you to the new game lobby
  /*async function handleCreateGame() {
    setCreating(true)
    try {
      const gameId = await createGame();
      await loadGames(); // refresh list
      window.location.href = `/games/${gameId}` //Sends the user to the newly created game
    } finally {
      setCreating(false)
    }
  }*/

  return (
    <div style={{ padding: 24 }}>
      <h1 className="text-3xl font-bold mb-3">Game Lobbies</h1>

      <Link href="/" className="block text-blue-600 hover:underline">
        Homepage
      </Link>

      <CreateFormModal type="game" onCreated={loadGames}/>

      <hr className="mb-2"/>

      {loading ? (
        <p>Loading games...</p>
      ) : games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <ul className="space-y-2">
          {games.map((game) => (
            <li key={game.game_id}>
              <Link 
                href={`/games/${game.game_id}`} 
                className="
                  w-[250px]
                  group
                  block
                  rounded-xl
                  border
                  bg-[var(--surface)] 
                  p-2 
                  transition 
                  hover:border-[var(--accent)]
                "
              >
                <strong className="group-hover:text-[var(--text-muted)]">
                  {game.game_name ?? game.game_id}
                </strong>
                <div className="group-hover:text-[var(--text-muted)]">
                  {game.players}/{game.max_players} players
                  {game.started && " • In progress"}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}