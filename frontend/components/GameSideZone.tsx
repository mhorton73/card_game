"use client"

import { useState } from "react"

import { CardInstancePackage, ZoneName } from "@/lib/types"
import GameCard from "./GameCard"
import GameZoneContents from "./GameZoneContents"
import { GameActions} from "@/lib/gameActions"

type GameSideZoneProps = {
  zoneName: ZoneName
  ownerId: string
  opponentId: string
  cards: CardInstancePackage[]
  actions: GameActions
}

export default function GameSideZone({
  zoneName,
  ownerId,
  opponentId,
  cards,
  actions,
}: GameSideZoneProps) {

  const [showContents, setShowContents] = useState(false)

  return (
    <div className="relative w-32">
      {/* Zone */}
      <div className="group relative" onClick={() => {
        setShowContents(true)
      }}>

        {/* Zone pile visual */}
        <div
          className="
            flex
            aspect-[5/7]
            w-[150px]
            items-center
            justify-center
            rounded-lg
            border-2
            bg-[var(--surface-dark)]
            shadow-lg
          "
        >
          <span className="text-lg font-bold">
            {zoneName}
          </span>
        </div>
        {/* Hover information */}
        <div
          className="
            absolute
            bottom-0
            left-full
            z-50
            ml-2
            hidden
            min-w-32
            rounded-md
            border
            border-gray-600
            bg-gray-900
            p-2
            text-sm
            text-white
            shadow-xl
            group-hover:block
          "
        >
          <div className="mb-2 text-center">
            {cards.length} cards
          </div>
        </div>
        {showContents && (
          <GameZoneContents
            zoneName={zoneName}
            ownerId={ownerId}
            opponentId={opponentId}
            cards={cards}
            actions={actions}
            onClose={() => {
                setShowContents(false)
            }}
          />
        )}
      </div>
    </div>
  )
}