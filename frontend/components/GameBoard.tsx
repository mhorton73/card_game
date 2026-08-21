import { ProcessedGameState } from "@/lib/types"
import Zone from "./GameZone"
import Hand from "./GameHand"
import GameDeckZone from "./GameDeckZone"
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
    <div className="w-full h-screen flex flex-col">
      <div className="grid grid-cols-[150px_1fr] grid-rows-6 gap-4 p-2 mt-auto">
        
        {/* ================= OPPONENT SIDE ================= */}

        <GameDeckZone
          ownerId={opponent.player_id}
          deckCount={opponent.deck_count}
          actions={actions}
        />

        <Zone 
          zoneName="catalysts" 
          ownerId={opponent.player_id}
          opponentId={you.player_id}
          cards={opponent.catalysts}
          actions = {actions}
        />

        <GameSideZone
          zoneName={"graveyard"}
          ownerId={opponent.player_id}
          opponentId={you.player_id}
          cards={opponent.graveyard}
          actions = {actions}
        />

        <Zone 
          zoneName="third_layer" 
          ownerId={opponent.player_id}
          opponentId={you.player_id} 
          cards={opponent.third_layer} 
          actions={actions}
        />

        <GameSideZone
          zoneName={"exile"}
          ownerId={opponent.player_id}
          opponentId={you.player_id}
          cards={opponent.exile}
          actions = {actions}
        />

        <Zone 
          zoneName="creatures" 
          ownerId={opponent.player_id}
          opponentId={you.player_id} 
          cards={opponent.creatures} 
          actions = {actions}
        />

        {/* ================= PLAYER SIDE ================= */}

        <GameSideZone
          zoneName={"exile"}
          ownerId={you.player_id}
          opponentId={opponent.player_id}
          cards={you.exile}
          actions = {actions}
        />

        <Zone 
          zoneName="creatures" 
          ownerId={you.player_id}
          opponentId={opponent.player_id} 
          cards={you.creatures} 
          actions={actions}
        />

        <GameSideZone
          zoneName={"graveyard"}
          ownerId={you.player_id}
          opponentId={opponent.player_id}
          cards={you.graveyard}
          actions = {actions}
        />
        
        <Zone 
          zoneName="third_layer"
          ownerId={you.player_id}
          opponentId={opponent.player_id} 
          actions={actions} 
          cards={you.third_layer} 
        />

        <GameDeckZone
          ownerId={you.player_id}
          deckCount={you.deck_count}
          actions={actions}
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

      
    </div>
  )
}