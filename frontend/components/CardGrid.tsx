import CardComponent from "@/components/CardComponent"
import { Card } from "@/lib/types"

type Props = {
  cards: Card[]
  renderActions?: (card: Card) => React.ReactNode
}

export default function CardGrid({ cards, renderActions }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 max-w-[1000px]">
      {cards.map((card) => (
        <div key={card.id} className="flex flex-col items-center">
          <CardComponent card={card} />
          
          {renderActions?.(card)}
        </div>       
      ))}
    </div>
  )
}