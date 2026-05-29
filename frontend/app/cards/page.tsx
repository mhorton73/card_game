import { getCards } from "@/lib/api"
import Link from "next/link";
import CardGallery from "@/components/CardGallery"

export default async function CardsPage() {
  
  try {
    const data = await getCards()

    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Cards</h1>

        <Link href="/cards/new?returnTo=/cards" className="text-blue-600 hover:underline">
          Create a New Card
        </Link>

        <CardGallery cards={data.cards} />
      </main>
    )
  } catch (error) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          Failed to load cards
        </h1>

        <p>Please try again later.</p>
      </main>
    )
  }
}