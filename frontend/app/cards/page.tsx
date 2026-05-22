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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 max-w-[1000px]">
        {data.cards.map((card) => (
          <div key={card.id} className="flex flex-col items-center">
            <CardComponent key={card.id} card={card} />
            
            <Link href={`/cards/${card.id}/edit`} className="text-blue-600 hover:underline">
              Edit
            </Link>
          </div>
        ))}
        
      </div>
    </main>
  )
}