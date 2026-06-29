import { ProcessedGameState } from "@/lib/types"
import Zone from "./GameZone"
import Hand from "./GameHand"
import SideZone from "./SideZone"

type Props = {
  gameState: ProcessedGameState
  playerId: string
}

export default function GameBoard({ gameState, playerId }: Props) {
  const opponent = gameState.players.find(p => p.player_id !== playerId)!
  const you = gameState.players.find(p => p.player_id === playerId)!

  return (
    <div className="w-full h-screen flex flex-col bg-green-900 text-white">

      {/* ================= OPPONENT SIDE ================= */}
      <div className="flex flex-col gap-2 p-2">

        <Zone zoneName="catalysts" cards={opponent.catalysts} flip />

        <Zone zoneName="third_layer" cards={opponent.third_layer} flip />

        <Zone zoneName="creatures" cards={opponent.creatures} flip />

      </div>

      {/* ================= CENTER STACK OVERLAY ================= */}
      {/*<StackOverlay stack={state.stack} />*/}

      {/* ================= PLAYER SIDE ================= */}
      <div className="flex flex-col gap-2 p-2 mt-auto">

        <Zone zoneName="creatures" cards={you.creatures} />

        <Zone zoneName="third_layer" cards={you.third_layer} />

        <Zone zoneName="catalysts" cards={you.catalysts} />

      </div>

      {/* ================= HAND ================= */}
      <Hand cards={you.hand} />

      {/* ================= SIDE ZONES ================= */}
      {/*<SideZones you={you} opponent={opponent} />*/}
    </div>
  )
}