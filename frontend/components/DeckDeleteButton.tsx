"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteDeck } from "@/lib/api"

interface DeckDeleteButtonProps {
  deckId: number
}

export default function DeckDeleteButton({ deckId }: DeckDeleteButtonProps) {
  const router = useRouter()

  const [pending, setPending] = useState(false)

  async function handleDelete() {

    try {
      await deleteDeck(deckId)
      setPending(false)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete deck:", error)
    }
  }

  return (
    <>
      <button
        onClick={() => setPending(true)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
      {pending && (
        // Transparent gray covering the screen
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/*The confirmation box*/}
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">
              Delete Deck?
            </h2>

            <p className="mt-2 text-gray-600">
              Are you sure you want to delete this deck?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPending(false)}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

{/*
  return (
    <>
      {!pending && (
        <button
          onClick={() => setPending(true)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      )}
      {pending && (
        <>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Confirm
          </button>
          <button
            onClick={() => setPending(false)}
            className="text-red-600 hover:underline"
          >
            Cancel
          </button>
        </>
      )}
    </>
  )
*/}