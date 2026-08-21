"use client"

import { GameActions } from "@/lib/gameActions"
import {useState, useEffect} from "react"
import GameDeckMenu from "./GameDeckMenu"

type GameDeckZoneProps = {
  ownerId: string
  deckCount: number
  actions: GameActions
}

export default function GameDeckZone({
  ownerId,
  deckCount,
  actions,
}: GameDeckZoneProps) {

  const [menu, setMenu] = useState<{
      x: number
      y: number
    } | null>(null)
  
    function handleContextMenu(event: React.MouseEvent) {
      event.preventDefault()
  
      setMenu({
        x: event.clientX,
        y: event.clientY,
      })
    }
  
    // Close the menu if the escape key is pressed
  
    useEffect(() => {
      if (!menu) return
  
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setMenu(null)
        }
      }
  
      window.addEventListener("keydown", handleKeyDown)
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [menu])

  return (
    <div className="relative w-32"
      onContextMenu={handleContextMenu}
    >
      {/* Deck */}
      <div className="group relative">

        {/* Deck visual */}
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
            Deck
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
            {deckCount} cards
          </div>
        </div>
      </div>
      {menu && (
            <GameDeckMenu
              ownerId={ownerId}
              actions={actions}
              x={menu.x}
              y={menu.y}
              onClose={() => setMenu(null)}
            />
          )}
    </div>
  )
}