"use client"

import { useEffect, useState } from "react"
import { getDecks, joinGame, selectDeck, startGame } from "@/lib/api"
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
  const [joiningGame, setJoiningGame] = useState(false)
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

  // Send request to join game
  async function handleJoinGame() {

    setJoiningGame(true)
    const req: JoinGameRequest = {player_id: playerId, name}
    try {
      await joinGame(gameId, req)
    } finally {
      setJoiningGame(false)
    }
  }


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
        <h1>Game Lobby</h1>

        <p>
            <strong>Game ID:</strong> {gameId}
        </p>

        <h2>Players</h2>

        <div style={{ marginBottom: 16 }}>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginRight: 8 }}
            />

            <button
                onClick={handleJoinGame}
                disabled={!name || joiningGame}
            >
                {joiningGame ? "Joining..." : "Join Game"}
            </button>
        </div>

      <ul>
        {gameState.players.map((player) => (
          <li key={player.player_id}>
            {player.name}
            {player.player_id === playerId && " (You)"}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Select Deck</h2>

      {loadingDecks ? (
        <p>Loading decks...</p>
      ) : (
        <>
          <select
            value={selectedDeck ?? ""}
            onChange={(e) => setSelectedDeck(Number(e.target.value))}
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
            style={{ marginLeft: 8 }}
          >
            {submittingDeck ? "Selecting..." : "Select Deck"}
          </button>
        </>
      )}

      <hr />

      <button
        onClick={handleStartGame}
        disabled={startingGame}
      >
        {startingGame ? "Starting..." : "Start Game"}
      </button>
    </div>
  );
}