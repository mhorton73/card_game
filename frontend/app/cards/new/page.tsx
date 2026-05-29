
import CardForm from "@/components/CardForm"
import { CardSet } from "@/lib/types"
import Link from "next/link";

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


export default async function CreateCardPage({
  searchParams,
}: Props) {
  const sets = await getSets()
  const { returnTo } = await searchParams

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create Card</h1>

      <Link href={returnTo ?? "/cards"} className="text-blue-600 hover:underline">
        Return to card gallery
      </Link>

      <CardForm 
        sets={sets}
        endpoint="http://localhost:8000/cards"
        method="POST"
        successMessage="Card created"
      />
    </main>
  )
}