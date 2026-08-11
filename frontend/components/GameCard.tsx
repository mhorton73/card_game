"use client"

import {useState} from "react"
import {Card, CardInstanceOut, CardContext} from "@/lib/types"
import CardComponent from "./CardComponent"
import { GameActions } from "@/lib/gameActions"
import GameZoneCardMenu from "./GameZoneCardMenu"

type GameCardProps = {
  card: Card
  instance: CardInstanceOut
  context: CardContext
  actions: GameActions
}

export default function GameCard({
  card,
  instance,
  context,
  actions
}: GameCardProps) {
  
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

  return (
    <div className={"relative"}
      onContextMenu={handleContextMenu}
    >
      <div
        className={[
          "transition-transform",
          "origin-center",
          instance.tapped ? "rotate-90" : ""
        ].join(" ")}
      >
        <CardComponent card={card} />
      </div>

      {menu && (
        <GameZoneCardMenu
          context={context}
          actions={actions}
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
        />
      )}

      {/* Counters (implement later)
      <div className="absolute top-2 right-2">
        ...
      </div>*/}
    </div>
  )
}