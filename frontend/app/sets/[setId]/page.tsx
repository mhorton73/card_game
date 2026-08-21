import { getCards, getSet } from "@/lib/api"
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
    const currentSet = await getSet(Number(setId))
    
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Set: {currentSet?.name}</h1>

        <Link href="/" className="block text-blue-600 hover:underline">
          Homepage
        </Link>

        <Link href={`/sets`} className="text-blue-600 hover:underline">
          Sets
        </Link>

        <Link href="/cards" className="block text-blue-600 hover:underline">
          All cards
        </Link>

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