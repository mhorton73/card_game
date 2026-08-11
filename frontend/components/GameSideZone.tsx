"use client"

import { GameActions } from "@/lib/gameActions"

type GameSideZoneProps = {
  playerId: string
  deckCount: number
  actions: GameActions
}

export default function GameSideZone({
  playerId,
  deckCount,
  actions,
}: GameSideZoneProps) {
  return (
    <div className="relative w-32">
      {/* Deck */}
      <div className="group relative">

        {/* Deck visual */}
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
            Deck
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
            {deckCount} cards
          </div>

          <button
            className="
              w-full
              rounded
              bg-blue-600
              px-3
              py-2
              font-medium
              hover:bg-blue-500
              active:bg-blue-700
            "
            onClick={() => actions.drawCards(playerId, 1)}
          >
            Draw
          </button>
        </div>

      </div>
    </div>
  )
}