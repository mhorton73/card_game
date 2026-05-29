
import CardForm from "@/components/CardForm"
import { CardSet } from "@/lib/types"
import Link from "next/link";

async function getCard(id: string) {
  const res = await fetch(`http://localhost:8000/cards/${id}`)
  return res.json()
}

async function getSets(): Promise<CardSet[]> {
  const res = await fetch("http://localhost:8000/sets")
  if (!res.ok) throw new Error("Failed to fetch sets")
  const data = await res.json()
  return data.card_sets
}

type Props = {
  searchParams: Promise<{
    returnTo?: string
  }>
}

export default async function EditCardPage({
  params,
  searchParams,
}: {
  params: Promise<{ cardId: string }>
  searchParams: Promise<{ returnTo?: string }>
}) {

  const { cardId } = await params
  const { returnTo } = await searchParams

  const sets = await getSets()
  const card = await getCard(cardId)

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Update Card</h1>

      <Link href={returnTo ?? "/cards"} className="text-blue-600 hover:underline">
        Return to card gallery
      </Link>

      <CardForm
        sets={sets}
        initialData={card}
        endpoint={`http://localhost:8000/cards/${cardId}`}
        method="PATCH"
        successMessage="Card updated!"
      />
    </main>
  )
}