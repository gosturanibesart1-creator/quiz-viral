"use client";

import Link from "next/link";
import { quizTemplates } from "@/lib/quizTemplates";

export default function CreateSelectPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0f] px-4 py-8 text-white">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔥</div>
          <h1 className="text-3xl font-bold mb-2">Zgjidh quizin</h1>
          <p className="text-zinc-400">
            Zgjidh një template dhe krijoje shumë shpejt
          </p>
        </div>

        <div className="space-y-4">
          {quizTemplates.map((template, index) => (
            <Link
              key={index}
              href={`/create/${index}`}
              className="block w-full rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5 active:scale-[0.99] transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl shrink-0">{template.emoji}</div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{template.title}</h2>
                  <p className="text-zinc-400 mt-1">
                    {template.questions.length} pyetje
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}