"use client";

import { useRouter } from "next/navigation";
import { quizTemplates } from "@/lib/quizTemplates";

export default function CreateSelectPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0c0c0f] text-white px-4 py-6">
      <div className="max-w-xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔥</div>
          <h1 className="text-3xl font-semibold mb-2">Zgjidh quizin</h1>
          <p className="text-zinc-400">
            Zgjidh një template dhe krijoje shumë shpejt
          </p>
        </div>

        <div className="space-y-4">
          {quizTemplates.map((quiz, index) => (
            <button
              key={`${quiz.title}-${index}`}
              type="button"
              onClick={() => router.push(`/create/${index}`)}
              className="relative z-10 w-full touch-manipulation rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5 text-left active:scale-[0.99]"
            >
              <div className="text-2xl font-bold mb-1">{quiz.title}</div>
              <div className="text-zinc-400">
                {quiz.questions.length} pyetje
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}