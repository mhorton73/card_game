import { CardInstancePackage, ZoneName } from "@/lib/types"
import GameCard from "./GameCard"
import { GameActions} from "@/lib/gameActions"

// Passed down from GameBoard are the zone name, the owner of the zone,
// the player on the other side of the board, and a list of card instances
// and game action handlers. Card instance package contains the card
// and card instance types.

type ZoneProps = {
  zoneName: ZoneName
  ownerId: string
  opponentId: string
  cards: CardInstancePackage[]
  actions: GameActions
  flip?: boolean
}

export default function Zone({
  zoneName,
  ownerId,
  opponentId,
  cards,
  actions,
  flip
}: ZoneProps) {

  return (
    <div className="border rounded-lg p-2 bg-[var(--surface-dark)]">
      <h2 className="font-semibold mb-2">
        {zoneName} ({cards.length})
      </h2>

      <div className="flex flex-wrap gap-2">
        {cards.map((c) => (
          <div
            key={c.instance.instance_id}
            className={`${flip ? "rotate-180" : ""}`}
          >
            <GameCard
              card={c.card}
              instance={c.instance}
              context={{
                instance_id: c.instance.instance_id,
                zone: zoneName, 
                owner_id: ownerId,
                opponent_id: opponentId
              }}
              actions={actions}
            />
          </div>
        ))}
      </div>
    </div>
  )
}