"use client"

import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import { connectToGame } from "@/lib/websocket";
import type { ProcessedGameState } from "@/lib/types";
import { processGameState } from "@/lib/gamestateProcessor";
import GameLobby from "./GameLobby";
import { createGameActions } from "@/lib/gameActions";


type Props = {
  gameId: string
}

export default function GameClient({ gameId }: Props) {

  const [gameState, setGameState] = useState<ProcessedGameState | null>(null)
  const [playerId, setPlayerId] = useState<string | null>(null)

  const actions = createGameActions(gameId)

  // Retrieve playerId from storage until auth is implemented
  useEffect(() => {
    let id = localStorage.getItem("player_id")

    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("player_id", id)
    }

    setPlayerId(id);
  }, []);
  
  // Connect to websocket
  useEffect(() => {

    if (!playerId) return

    const ws = connectToGame(gameId, playerId)

    ws.onopen = () => {
      console.log("connected")
    }

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data)

      if (msg.type === "game_state") {
        let updatedState = await processGameState(msg.state)
        setGameState(updatedState)
      }
    }

    ws.onerror = (err) => {
      console.error("WebSocket error", err)
    }

    return () => {
      ws.close()
    }
  }, [gameId, playerId])

  // Guard against null values in rendering
  if (!playerId) return <div>Loading player...</div>
  if (!gameState) return <div>Loading game...</div>


  if (!gameState.game_started) {
    return (
      <GameLobby
        gameId={gameId}
        gameState={gameState}
        playerId={playerId}
      />
    )
  }

  return (
    <GameBoard
      gameState={gameState}
      playerId={playerId}
      actions={actions}
    />
  )
}