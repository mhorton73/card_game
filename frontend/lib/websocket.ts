
const WS_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function connectToGame(gameId: string, playerId: string): WebSocket {
  return new WebSocket(
    `${WS_BASE}/ws/game/${gameId}/${playerId}`
  )
}