import { ProcessedGameState } from "@/lib/types"
import Zone from "./GameZone"
import Hand from "./GameHand"
import GameSideZone from "./GameSideZone"
import { GameActions } from "@/lib/gameActions"

type Props = {
  gameState: ProcessedGameState
  playerId: string
  actions: GameActions
}

export default function GameBoard({ gameState, playerId, actions }: Props) {
  const opponent = gameState.players.find(p => p.player_id !== playerId)!
  const you = gameState.players.find(p => p.player_id === playerId)!

  return (
    <div className="w-full h-screen flex flex-col bg-green-900">

      {/* ================= OPPONENT SIDE ================= */}
      <div className="flex flex-col gap-2 p-2">

        <Zone 
          zoneName="catalysts" 
          ownerId={opponent.player_id}
          opponentId={you.player_id}
          cards={opponent.catalysts}
          actions = {actions}
          flip 
        />

        <Zone 
          zoneName="third_layer" 
          ownerId={opponent.player_id}
          opponentId={you.player_id} 
          cards={opponent.third_layer} 
          actions={actions}
          flip 
        />

        <Zone 
          zoneName="creatures" 
          ownerId={opponent.player_id}
          opponentId={you.player_id} 
          cards={opponent.creatures} 
          actions = {actions}
          flip 
        />

      </div>

      {/* ================= CENTER STACK OVERLAY ================= */}
      {/*<StackOverlay stack={state.stack} />*/}

      {/* ================= PLAYER SIDE ================= */}
      <div className="flex flex-col gap-2 p-2 mt-auto">

        <Zone 
          zoneName="creatures" 
          ownerId={you.player_id}
          opponentId={opponent.player_id} 
          cards={you.creatures} 
          actions={actions}
        />

        <Zone 
          zoneName="third_layer"
          ownerId={you.player_id}
          opponentId={opponent.player_id} 
          actions={actions} 
          cards={you.third_layer} 
        />

        <Zone 
          zoneName="catalysts"
          ownerId={you.player_id}
          opponentId={opponent.player_id}
          actions={actions}
          cards={you.catalysts} 
        />

      </div>

      {/* ================= HAND ================= */}
      <Hand 
        cards={you.hand} 
        ownerId={you.player_id}
        opponentId={opponent.player_id}
        actions={actions}
      />

      {/* ================= SIDE ZONES ================= */}
      <GameSideZone
        playerId={you.player_id}
        deckCount={you.deck_count}
        actions={actions}
      />
    </div>
  )
}