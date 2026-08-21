import Link from "next/link";

const links = [
  {
    href: "/cards",
    title: "Cards",
    description: "Browse the card gallery, edit existing cards and create new cards.",
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
    <main className="min-h-screen]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Card Game
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Welcome to my card game platform demo! Right now, everything is still pretty rough,
            but you can make cards and decks, then play with them (not automated, everything is manual,
            so I recommend voice chat with your friend/s).
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                group 
                rounded-xl 
                border 
                bg-[var(--surface)] 
                p-6 
                transition 
                hover:border-[var(--accent)]
              "
            >
              <h2 className="text-2xl font-semibold group-hover:text-[var(--text-muted)]">
                {link.title}
              </h2>

              <p className="mt-3 group-hover:text-[var(--text-muted)]">
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