"use client"

import { CardContext, ZoneName } from "@/lib/types"
import { GameActions } from "@/lib/gameActions"

type Props = {
  context: CardContext
  actions: GameActions
  onClose: () => void
  x: number
  y: number
}

const moveDestinations: { label: string; zone: ZoneName }[] = [
  { label: "Creatures", zone: "creatures" },
  { label: "Catalysts", zone: "catalysts" },
  { label: "Third Layer", zone: "third_layer" },
  { label: "Graveyard", zone: "graveyard" },
  { label: "Exile", zone: "exile" },
  { label: "Hand", zone: "hand" },
]

export default function GameZoneCardMenu({
  context,
  actions,
  onClose,
  x,
  y,
}: Props) {
  return (
    <div
      className="fixed z-50 min-w-44 rounded-md border border-gray-600 bg-gray-900 p-1 text-sm text-white shadow-xl"
      style={{
        left: x,
        top: y,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Move card */}
      <div className="group relative">
        <button
          className="flex w-full items-center justify-between rounded px-3 py-2 text-left hover:bg-gray-700"
        >
          <span>Move card</span>
          <span>▸</span>
        </button>

        {/* Submenu */}
        <div className="absolute left-full top-0 hidden min-w-44 pl-1 group-hover:block">
          <div className="rounded-md border border-gray-600 bg-gray-900 p-1 shadow-xl">
            {moveDestinations.map((destination) => (
              <button
                key={destination.zone}
                className="block w-full rounded px-3 py-2 text-left hover:bg-gray-700"
                onClick={() => {
                  actions.moveCardToYourZone(
                    context,
                    destination.zone
                  )
                  onClose()
                }}
              >
                {destination.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tap */}
      <button
        className="block w-full rounded px-3 py-2 text-left hover:bg-gray-700"
        onClick={() => {
          actions.tapCard(context)
          onClose()
        }}
      >
        Tap
      </button>

      {/* Untap */}
      <button
        className="block w-full rounded px-3 py-2 text-left hover:bg-gray-700"
        onClick={() => {
          actions.untapCard(context)
          onClose()
        }}
      >
        Untap
      </button>
      {/* Put on top of deck */}
      <button
        className="block w-full rounded px-3 py-2 text-left hover:bg-gray-700"
        onClick={() => {
          actions.putOnTop(context)
          onClose()
        }}
      >
        Put on top of deck
      </button>
      {/* Put on top of deck */}
      <button
        className="block w-full rounded px-3 py-2 text-left hover:bg-gray-700"
        onClick={() => {
          actions.putOnBottom(context)
          onClose()
        }}
      >
        Put on bottom of deck
      </button>
    </div>
  )
}