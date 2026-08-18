import Link from "next/link";

const links = [
  {
    href: "/cards",
    title: "Cards",
    description: "Browse and create cards for your collection.",
  },
  {
    href: "/decks",
    title: "Decks",
    description: "Build and manage your decks.",
  },
  {
    href: "/games",
    title: "Games",
    description: "Create or join a game and play.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Card Game
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Create cards, build decks, and play games with friends.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500 hover:bg-gray-800"
            >
              <h2 className="text-2xl font-semibold group-hover:text-blue-400">
                {link.title}
              </h2>

              <p className="mt-3 text-gray-400">
                {link.description}
              </p>

              <p className="mt-6 text-sm font-medium text-blue-400">
                Open →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}