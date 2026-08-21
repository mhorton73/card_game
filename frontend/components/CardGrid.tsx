import CardComponent from "@/components/CardComponent"
import { Card } from "@/lib/types"

type Props = {
  cards: Card[]
  renderActions?: (card: Card) => React.ReactNode
}

export default function CardGrid({ cards, renderActions }: Props) {
  return (
    <div className="
      grid 
      grid-cols-[repeat(auto-fit,minmax(235px,1fr))] 
      justify-center 
      gap-4 
      max-w-[1050px]"
    >
      {cards.map((card) => (
        <div key={card.id} className="flex flex-col items-center">
          <CardComponent card={card} />
          
          {renderActions?.(card)}
        </div>       
      ))}
    </div>
  )
}