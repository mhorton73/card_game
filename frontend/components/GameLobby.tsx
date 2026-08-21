"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getDecks, joinGame, selectDeck, startGame } from "@/lib/api"
import JoinGameModal from "./JoinGameModal"
import type { ProcessedGameState, Deck, SelectDeckRequest, JoinGameRequest } from "@/lib/types"


type Props = {
  gameId: string
  gameState: ProcessedGameState
  playerId: string
};

export default function GameLobby({
  gameId,
  gameState,
  playerId,
}: Props) {
  const [decks, setDecks] = useState<Deck[]>([])
  const [selectedDeck, setSelectedDeck] = useState<number>()
  const [name, setName] = useState("")
  const [loadingDecks, setLoadingDecks] = useState(true)
  const [submittingDeck, setSubmittingDeck] = useState(false)
  const [startingGame, setStartingGame] = useState(false)


  // Load in the list of decks
  useEffect(() => {
    async function loadDecks() {
      try {
        const response = await getDecks()
        setDecks(response.decks)
      } catch (err) {
        console.error("Failed to load decks", err)
      } finally {
        setLoadingDecks(false)
      }
    }

    loadDecks()
  }, []);

  // Send request to select deck
  async function handleSelectDeck() {
    if (!selectedDeck) return

    setSubmittingDeck(true)
    const req: SelectDeckRequest = {player_id: playerId, deck_id: selectedDeck}
    try {
      await selectDeck(gameId, req)
    } finally {
      setSubmittingDeck(false)
    }
  }

  // Send request to start the game
  async function handleStartGame() {
    setStartingGame(true);

    try {
      await startGame(gameId)
    } finally {
      setStartingGame(false)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 className="text-3xl font-bold mb-6">Game Lobby: {gameState.game_name}</h1>

      <Link href="/games" className="block text-blue-600 hover:underline">
          Return to list
        </Link>

      <p className="mb-4">
            <strong>Game ID:</strong> {gameId}
        </p>
        
      <JoinGameModal gameId={gameId} playerId={playerId}/>

      <table className=" max-w-2xl border-collapse mb-4">
        <thead>
          <tr className="border border-[var(--surface-dark)] bg-[var(--surface-dark)]">
            <th className="min-w-[155px] px-4 py-2 text-left">Player</th>
            <th className="min-w-[155px] px-4 py-2 text-left">Deck</th>
          </tr>
        </thead>

        <tbody>
          {gameState.players.map((player) => (
            <tr
              key={player.player_id}
              className="border border-[var(--surface-dark)]"
            >
              <td className="border border-[var(--surface-dark)] bg-[var(--surface-light)] px-4 py-2">
                {player.name}
                {player.player_id === playerId && " (You)"}
              </td>

              <td className="border border-[var(--surface-dark)] bg-[var(--surface-light)] px-4 py-2">
                {player.deck_name ?? "No deck selected"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loadingDecks ? (
        <p>Loading decks...</p>
      ) : (
        <div className="flex gap-1">
          <select
            value={selectedDeck ?? ""}
            onChange={(e) => setSelectedDeck(Number(e.target.value))}
            className="
              rounded
              px-2 
              py-1.5
              bg-[var(--surface)]" 
          >
            <option value="">Choose a deck...</option>

            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSelectDeck}
            disabled={!selectedDeck || submittingDeck}
            className="
              rounded 
              border 
              px-2 
              py-1 
              bg-[var(--surface)] 
              hover:bg-[var(--surface-light)] 
              hover:border-[var(--accent)]"
          >
            {submittingDeck ? "Selecting..." : "Select Deck"}
          </button>
        </div>
      )}

      <hr className="my-2 max-w-[600px]"/>

      <button
        onClick={handleStartGame}
        disabled={startingGame}
        className="
          rounded 
          border 
          px-2 
          py-1 
          bg-[var(--surface)] 
          hover:bg-[var(--surface-light)] 
          hover:border-[var(--accent)]"
      >
        {startingGame ? "Starting..." : "Start Game"}
      </button>
    </div>
  );
}