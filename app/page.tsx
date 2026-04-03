import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0c0c0f] text-white px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">💚</div>
          <h1 className="text-4xl font-bold mb-2">Sfida e miqësisë</h1>
          <p className="text-zinc-400 text-lg">
            Krijo quizin tënd dhe shiko sa mirë të njohin miqtë.
          </p>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-[#151519] p-6 shadow-2xl mb-6">
          <div className="mb-5">
            <div className="inline-flex rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-400">
              Viral Quiz App
            </div>
          </div>

          <h2 className="text-3xl font-bold leading-tight mb-3">
            Krijo quiz premium për veten
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            Zgjidh një template, vendos përgjigjet e tua dhe ndaj linkun me shokët.
          </p>

          <Link
            href="/create"
            className="block w-full rounded-2xl bg-green-500 px-6 py-4 text-center text-2xl font-bold text-black transition active:scale-[0.98]"
          >
            Fillo tani 🚀
          </Link>
        </div>

        <div className="grid gap-4 mb-6">
          <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-bold mb-1">Krijim i shpejtë</h3>
            <p className="text-zinc-400">
              Vetëm pak hapa dhe quiz-i yt është gati.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-bold mb-1">Leaderboard real</h3>
            <p className="text-zinc-400">
              Shiko kush të njeh më mirë dhe kush del në top.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="text-xl font-bold mb-1">Share direkt</h3>
            <p className="text-zinc-400">
              Dërgoje linkun dhe sfido shokët menjëherë.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5 text-center">
          <h3 className="text-2xl font-bold mb-3">Si funksionon?</h3>
          <div className="space-y-3 text-zinc-400 text-left">
            <p>1. Zgjidh një kategori quiz-i</p>
            <p>2. Vendos përgjigjet e tua</p>
            <p>3. Ndaj linkun me miqtë</p>
            <p>4. Shiko rezultatin dhe leaderboard-in</p>
          </div>
        </div>
      </div>
    </main>
  );
}