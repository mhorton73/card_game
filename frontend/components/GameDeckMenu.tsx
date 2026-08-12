"use client"

import { GameActions } from "@/lib/gameActions"

type Props = {
  ownerId: string
  actions: GameActions
  onClose: () => void
  x: number
  y: number
}

export default function GameDeckMenu({
  ownerId,
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

      {/* Draw a card*/}
      <button
        className="block w-full rounded px-3 py-2 text-left hover:bg-gray-700"
        onClick={() => {
          actions.drawCards(ownerId, 1)
          onClose()
        }}
      >
        Draw a card
      </button>
    </div>
  )
}