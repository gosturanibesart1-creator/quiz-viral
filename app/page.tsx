import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0c0c0f] text-white px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">💚</div>
          <h1 className="text-4xl font-bold mb-2">Sfida e Miqësisë</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
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
            Zgjidh një template, vendos përgjigjet e tua dhe ndaj linkun me
            shokët. Sfidoji dhe zbulo kush të njeh më mirë.
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
            <p className="text-zinc-400 leading-relaxed">
              Vetëm pak hapa dhe quiz-i yt është gati për t’u shpërndarë.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-bold mb-1">Leaderboard real</h3>
            <p className="text-zinc-400 leading-relaxed">
              Shiko kush të njeh më mirë dhe kush del në krye të renditjes.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="text-xl font-bold mb-1">Share direkt</h3>
            <p className="text-zinc-400 leading-relaxed">
              Dërgoje linkun menjëherë dhe sfido shokët pa humbur kohë.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5 mb-6">
          <h3 className="text-2xl font-bold mb-3 text-center">Si funksionon?</h3>
          <div className="space-y-3 text-zinc-400 text-left leading-relaxed">
            <p>1. Zgjidh një kategori quiz-i</p>
            <p>2. Vendos përgjigjet e tua</p>
            <p>3. Ndaj linkun me miqtë</p>
            <p>4. Shiko rezultatin dhe leaderboard-in</p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#151519] p-5 mb-8">
          <h3 className="text-2xl font-bold mb-3">Rreth platformës</h3>
          <p className="text-zinc-400 leading-relaxed">
            Sfida e Miqësisë është një platformë argëtuese ku krijon quiz-in tënd
            personal dhe e ndan me miqtë për të parë sa mirë të njohin. Qëllimi
            është të ofrojë një eksperiencë të thjeshtë, sociale dhe të shpejtë
            si në telefon ashtu edhe në desktop.
          </p>
        </div>

        <footer className="border-t border-zinc-800 pt-6 pb-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            © 2026 Sfida e Miqësisë. Të gjitha të drejtat të rezervuara.
          </p>
        </footer>
      </div>
    </main>
  );
}