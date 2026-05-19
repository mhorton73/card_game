
import CardForm from "@/components/CardForm"
import { CardSet } from "@/lib/types"
import Link from "next/link";

async function getSets(): Promise<CardSet[]> {
  const res = await fetch("http://localhost:8000/card-editor/sets")
  if (!res.ok) throw new Error("Failed to fetch sets")
  const data = await res.json()
  return data.card_sets
}

export default async function CreateCardPage() {
  const sets = await getSets()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create Card</h1>

      <Link href="/cards" className="text-blue-600 hover:underline">
        Return to card gallery
      </Link>

      <CardForm sets={sets} successMessage="Card created"/>
    </main>
  )
}