import {Card, CardInstanceOut} from "@/lib/types"
import CardComponent from "./CardComponent"

type GameCardProps = {
  card: Card
  instance: CardInstanceOut
}

export default function GameCard({card,instance}: GameCardProps) {
  return (
    <div className={[
        "relative",
        "transition-transform",
        "origin-center",
        instance.tapped ? "rotate-90" : ""
      ].join(" ")}
    >
      <CardComponent card={card} />

      {/* Counters 
      <div className="absolute top-2 right-2">
        ...
      </div>*/}
    </div>
  )
}