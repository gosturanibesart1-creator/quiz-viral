"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { quizTemplates, type QuizTemplate } from "@/lib/quizTemplates";

export default function CreateQuizFromTemplatePage() {
  const params = useParams();
  const router = useRouter();

  const templateId = Array.isArray(params.id) ? params.id[0] : params.id;
  const parsedId = Number(templateId);

  const template = useMemo<QuizTemplate | null>(() => {
    if (Number.isNaN(parsedId)) return null;
    return quizTemplates[parsedId] ?? null;
  }, [parsedId]);

  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!template) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] text-white px-4 py-6">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-3">Quiz nuk u gjet</h1>
          <button
            onClick={() => router.push("/create")}
            className="rounded-2xl bg-green-500 px-5 py-3 font-semibold text-black"
          >
            Kthehu
          </button>
        </div>
      </main>
    );
  }

  const safeTemplate = template;

  function handleSelect(questionIndex: number, optionLabel: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionLabel,
    }));
  }

  async function handleCreateQuiz() {
    setError("");

    if (!name.trim()) {
      setError("Shkruaj emrin tënd.");
      return;
    }

    if (Object.keys(answers).length !== safeTemplate.questions.length) {
      setError("Përgjigju të gjitha pyetjeve.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        type: safeTemplate.title,
        emoji: safeTemplate.emoji,
        ownerName: name.trim(),
        questions: safeTemplate.questions.map((q, index) => ({
          question: q.question,
          options: q.options,
          correctAnswer: answers[index],
        })),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "quizzes"), payload);

      router.push(`/play/${docRef.id}`);
    } catch (err: any) {
      console.error("Create quiz error:", err);
      setError(err?.message || "Ndodhi një gabim gjatë krijimit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0c0c0f] text-white px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="text-5xl mb-3">{safeTemplate.emoji}</div>
          <h1 className="text-3xl font-bold">{safeTemplate.title} Quiz</h1>
          <p className="text-zinc-400 mt-2">
            Plotëso përgjigjet e tua dhe krijoje quiz-in
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-300 mb-2">Emri yt</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Shkruaj emrin"
            className="w-full rounded-2xl border border-zinc-800 bg-[#1a1a1f] px-4 py-3 outline-none"
          />
        </div>

        <div className="space-y-6">
          {safeTemplate.questions.map((q, questionIndex) => (
            <div
              key={questionIndex}
              className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5"
            >
              <h2 className="text-lg font-semibold mb-4">{q.question}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((option, optionIndex) => {
                  const selected = answers[questionIndex] === option.label;

                  return (
                    <button
                      key={`${option.label}-${optionIndex}`}
                      type="button"
                      onClick={() => handleSelect(questionIndex, option.label)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        selected
                          ? "border-green-500 bg-green-500/10"
                          : "border-zinc-700 bg-[#111114] hover:border-zinc-500"
                      }`}
                    >
                      <span className="mr-2">{option.emoji}</span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="mt-6 text-red-400">{error}</p>}

        <button
          onClick={handleCreateQuiz}
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-green-500 px-5 py-4 font-bold text-black disabled:opacity-50"
        >
          {loading ? "Duke u krijuar..." : "Krijo Quiz"}
        </button>
      </div>
    </main>
  );
}