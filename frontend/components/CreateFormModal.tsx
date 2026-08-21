"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addDeck, addSet, createGame } from "@/lib/api"

type CreateType = "deck" | "set" | "game"


const config: Record<
  CreateType,
  {
    title: string
    nameLabel: string
    buttonLabel: string
    create: (name: string) => Promise<unknown>
  }
> = {
  deck: {
    title: "Create New Deck",
    nameLabel: "Deck Name",
    buttonLabel: "Create Deck",
    create: (name) => addDeck({ name }),
  },

  set: {
    title: "Create New Set",
    nameLabel: "Set Name",
    buttonLabel: "Create Set",
    create: (name) => addSet({ name }),
  },

  game: {
    title: "Create New Game",
    nameLabel: "Game Name",
    buttonLabel: "Create Game",
    create: (name) => createGame({ name }),
  },
}

type CreateFormModalProps = {
  type: CreateType
  onCreated?: () => void | Promise<void>
}

export default function CreateFormModal( {type, onCreated}: CreateFormModalProps ) {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const { title, nameLabel, buttonLabel, create } = config[type]

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    if (!name.trim() && type != "game") {
      return;
    }

    setLoading(true)

    try {
      await create(name.trim())

      setName("")
      setOpen(false)
      router.refresh()
      await onCreated?.()
    } catch (error) {
      console.error("Failed to create deck:", error)
    } finally {
      setLoading(false)
    }
  }

  return (

    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline"
      >
        {title}
      </button>

      {open && (
        // Transparent gray covering the screen
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/*The confirmation box*/}
          <div className="w-full max-w-md rounded-lg bg-[var(--background)] p-6 shadow-xl">
            <h2 className="text-2xl font-bold">{title}</h2>

            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block">
                <span className="text-sm font-medium">
                  {nameLabel}
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded bg-[var(--surface-light)] border p-2"
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
                  className="
                    rounded 
                    border 
                    px-4 
                    py-2 
                    bg-[var(--surface)] 
                    hover:bg-[var(--surface-light)] 
                    hover:border-[var(--accent)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="
                    rounded 
                    border 
                    px-4 
                    py-2 
                    bg-[var(--surface)] 
                    hover:bg-[var(--surface-light)] 
                    hover:border-[var(--accent)]"
                >
                  {loading ? "Creating..." : buttonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}