import CardGrid from "@/components/CardGrid"
import Link from "next/link"
import { Card } from "@/lib/types"

type Props = {
  cards: Card[]
}

export default function CardGallery({ cards }: Props) {
  return (
    <CardGrid
        cards={cards}
        renderActions={(card) => (
            <Link
            href={`/cards/${card.id}/edit`}
            className="text-blue-600 hover:underline"
            >
            Edit
            </Link>
        )}
        />
  )
}