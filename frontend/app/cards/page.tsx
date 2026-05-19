import { getCards } from "@/lib/api"
import CardComponent from "@/components/CardComponent"
import Link from "next/link";

export default async function CardsPage() {
  const data = await getCards()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cards</h1>

      <Link href="/cards/create" className="text-blue-600 hover:underline">
        Create a New Card
      </Link>

      <div className="grid grid-cols-4 gap-4">
        {data.cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </main>
  )
}