"use client"

import { CardInstancePackage, ZoneName } from "@/lib/types"
import { GameActions } from "@/lib/gameActions"
import GameCard from "./GameCard"

type GameZoneContentsProps = {
  zoneName: ZoneName
  ownerId: string
  opponentId: string
  cards: CardInstancePackage[]
  actions: GameActions
  onClose: () => void
}

export default function GameZoneContents({
  zoneName,
  ownerId,
  opponentId,
  cards,
  actions,
  onClose,
}: GameZoneContentsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      
      <div 
        className="relative max-h-[80vh] w-[80vw] overflow-y-auto rounded-lg bg-[var(--surface-dark)] p-6"
        onClick={(event) => event.stopPropagation()}
      >
        
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {zoneName} ({cards.length})
          </h2>

          <button
            onClick={onClose}
            className="rounded px-3 py-1 hover:bg-[var(--background)]"
          >
            X
          </button>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-4">
          {cards.map((c) => (
            <div
              key={c.instance.instance_id}
              className="w-32"
            >
              <GameCard
                card={c.card}
                instance={c.instance}
                context={{
                  instance_id: c.instance.instance_id,
                  zone: zoneName,
                  owner_id: ownerId,
                  opponent_id: opponentId,
                }}
                actions={actions}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}