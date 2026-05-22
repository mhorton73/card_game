
import CardForm from "@/components/CardForm"
import { CardSet } from "@/lib/types"
import Link from "next/link";

async function getCard(id: string) {
  const res = await fetch(`http://localhost:8000/card-editor/cards/${id}`)
  return res.json()
}

async function getSets(): Promise<CardSet[]> {
  const res = await fetch("http://localhost:8000/card-editor/sets")
  if (!res.ok) throw new Error("Failed to fetch sets")
  const data = await res.json()
  return data.card_sets
}


export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
  const sets = await getSets()
  const card = await getCard(id)

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Update Card</h1>

      <Link href="/cards" className="text-blue-600 hover:underline">
        Return to card gallery
      </Link>

      <CardForm
        sets={sets}
        initialData={card}
        endpoint={`http://localhost:8000/card-editor/cards/${id}`}
        method="PATCH"
        successMessage="Card updated!"
      />
    </main>
  )
}