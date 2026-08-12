"use client"

import { CardInstancePackage, ZoneName } from "@/lib/types"
import GameCard from "./GameCard"
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

  return (
    <div className="relative w-32">
      {/* Zone */}
      <div className="group relative">

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
      </div>
    </div>
  )
}