import { getCards } from "@/lib/api"
import Link from "next/link";
import CardGallery from "@/components/CardGallery"

type Props = {
  params: Promise<{
    setId: string
  }>
}


export default async function CardsBySetPage({ params }:Props) {
  
  const { setId } = await params
  try {
    const data = await getCards(Number(setId))

    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Cards</h1>

        <Link href={`/cards/new?returnTo=/sets/${setId}`} className="text-blue-600 hover:underline">
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