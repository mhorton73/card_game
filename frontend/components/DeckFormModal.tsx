"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addDeck } from "@/lib/api"

export default function DeckFormModal() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    setLoading(true);

    try {
      await addDeck({
        name: name.trim(),
      });

      setName("");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create deck:", error);
    } finally {
      setLoading(false);
    }
  }

  return (

    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline"
      >
        Create New Deck
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-bold">Create New Deck</h2>

          <form onSubmit={handleSubmit} className="mt-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Deck Name
              </span>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 p-2"
                placeholder="My New Deck"
                autoFocus
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setName("")
                  setOpen(false)
                }}
                className="rounded px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Deck"}
              </button>
            </div>
          </form>
        </div>
        </div>
      )}
    </>
  );
}