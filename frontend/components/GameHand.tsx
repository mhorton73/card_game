import { CardInstancePackage } from "@/lib/types"
import GameCard from "./GameCard"
import { GameActions } from "@/lib/gameActions"

type HandProps = {
  cards: CardInstancePackage[]
  ownerId: string
  opponentId: string
  actions: GameActions
}

export default function Hand({
  cards,
  ownerId,
  opponentId,
  actions
}: HandProps) {
  return (
    <div className="border rounded-lg p-2 bg-[var(--surface-dark)]">
      <h2 className="font-semibold mb-2">
        {"hand"} ({cards.length})
      </h2>

      <div className="flex flex-wrap gap-2">
        {cards.map((c) => (
          <div
            key={c.instance.instance_id}
          >
            <GameCard
              card={c.card}
              instance={c.instance}
              context={{
                instance_id: c.instance.instance_id,
                zone: "hand", 
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