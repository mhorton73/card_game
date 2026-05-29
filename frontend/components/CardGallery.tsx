import CardComponent from "@/components/CardComponent"
import Link from "next/link"
import { Card } from "@/lib/types"

type Props = {
  cards: Card[]
  editBaseUrl?: string
}

export default function CardGallery({ cards, editBaseUrl = "/cards" }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 max-w-[1000px]">
      {cards.map((card) => (
        <div key={card.id} className="flex flex-col items-center">
          <CardComponent card={card} />

          <Link
            href={`${editBaseUrl}/${card.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  )
}