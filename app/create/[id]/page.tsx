"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  quizTemplates,
  QuizTemplateQuestion,
  QuizTemplateOption,
} from "@/lib/quizTemplates";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CreatePremiumPage() {
  const params = useParams();
  const router = useRouter();

  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const templateIndex = Number(id);
  const template = quizTemplates[templateIndex];

  const [step, setStep] = useState(-1);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<number[]>(
    new Array(template?.questions?.length || 0).fill(-1)
  );
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);

  if (!template) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Template nuk u gjet</h1>
          <p className="text-zinc-400">Kthehu dhe zgjidh një kategori tjetër.</p>
        </div>
      </main>
    );
  }

  const progress =
    step >= 0
      ? Math.round(((step + 1) / template.questions.length) * 100)
      : 0;

  const isLastStep = step === template.questions.length - 1;

  const next = () => {
    if (step < template.questions.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const choose = (index: number) => {
    const copy = [...answers];
    copy[step] = index;
    setAnswers(copy);

    if (!isLastStep) {
      setTimeout(() => {
        next();
      }, 180);
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Vendos emrin");
      return;
    }

    if (answers.some((a) => a === -1)) {
      alert("Zgjidh përgjigje për të gjitha pyetjet");
      return;
    }

    try {
      setLoading(true);

      const questions = template.questions.map(
        (q: QuizTemplateQuestion, i: number) => ({
          question: q.question,
          options: q.options,
          correctIndex: answers[i],
        })
      );

      const docRef = await addDoc(collection(db, "quizzes"), {
        name: name.trim(),
        templateTitle: template.title,
        templateEmoji: template.emoji,
        questions,
        createdAt: Date.now(),
      });

      router.push(`/u/${docRef.id}`);
    } catch (error) {
      console.error(error);
      alert("Diçka shkoi keq");
    } finally {
      setLoading(false);
    }
  };

  const handleStartClick = () => {
    if (starting) return;

    const cleanName = name.trim();

    if (!cleanName) {
      alert("Vendos emrin");
      return;
    }

    setStarting(true);

    const active = document.activeElement as HTMLElement | null;
    active?.blur();

    setTimeout(() => {
      setStep(0);
      setStarting(false);
    }, 180);
  };

  if (step === -1) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] text-white flex items-center justify-center px-4 py-8">
        <div className="max-w-sm w-full text-center">
          <div className="text-5xl mb-3">{template.emoji}</div>

          <h1 className="text-3xl font-semibold mb-2">Fillo quizin</h1>

          <p className="text-zinc-400 mb-3">{template.title}</p>

          <p className="text-zinc-500 mb-6">Shkruaj emrin dhe vazhdo</p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleStartClick();
              }
            }}
            placeholder="Emri yt"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="done"
            className="w-full bg-[#1a1a1f] border border-zinc-800 rounded-2xl px-5 py-4 text-lg outline-none mb-4 focus:border-green-500"
          />

          <button
            type="button"
            onClick={handleStartClick}
            disabled={starting}
            className="w-full bg-green-500 text-black py-4 rounded-2xl text-xl font-semibold disabled:opacity-70"
          >
            {starting ? "Duke vazhduar..." : "Vazhdo →"}
          </button>
        </div>
      </main>
    );
  }

  const q = template.questions[step];
  const manyOptions = q.options.length > 8;
  const mediumOptions = q.options.length > 4 && q.options.length <= 8;

  return (
    <main className="min-h-screen bg-[#0c0c0f] text-white px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="text-sm text-zinc-500 mb-2">
            {step + 1} / {template.questions.length}
          </div>

          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-4 sm:p-5">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-5 leading-tight">
            {q.question}
          </h1>

          <div
            className={[
              "gap-3",
              manyOptions
                ? "grid grid-cols-1"
                : mediumOptions
                ? "grid grid-cols-2"
                : "grid grid-cols-2",
            ].join(" ")}
          >
            {q.options.map((opt: QuizTemplateOption, i: number) => {
              const active = answers[step] === i;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => choose(i)}
                  className={`rounded-2xl border px-4 py-4 text-center transition active:scale-95 min-h-[84px] flex flex-col items-center justify-center ${
                    active
                      ? "bg-green-500 text-black border-green-500"
                      : "bg-black text-white border-zinc-800"
                  }`}
                >
                  <div className="text-2xl mb-2">{opt.emoji}</div>
                  <div className="text-sm sm:text-base font-semibold leading-snug">
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>

          {isLastStep && (
            <button
              type="button"
              onClick={handleCreate}
              disabled={loading}
              className="mt-6 w-full bg-green-500 text-black py-4 rounded-2xl text-xl font-bold disabled:opacity-50"
            >
              {loading ? "Duke krijuar..." : "Krijo quiz 🚀"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}