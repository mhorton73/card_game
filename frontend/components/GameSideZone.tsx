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
        console.log("side zone open button hit")
        setShowContents(true)
      }}>

        {/* Zone pile visual */}
        <div
          className="
            flex
            aspect-[5/7]
            w-32
            items-center
            justify-center
            rounded-lg
            border-2
            border-gray-500
            bg-gray-800
            shadow-lg
          "
        >
          <span className="text-lg font-bold text-gray-300">
            {zoneName}
          </span>
        </div>
        {/* Hover information */}
        <div
          className="
            absolute
            bottom-0
            left-full
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
                console.log("side zone close button hit")
                setShowContents(false)
            }}
          />
        )}
      </div>
    </div>
  )
}