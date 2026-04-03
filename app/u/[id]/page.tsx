"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type QuizOption = {
  label: string;
  emoji: string;
};

type QuizQuestion = {
  question: string;
  options: QuizOption[] | string[];
  correctIndex: number;
};

type Quiz = {
  name: string;
  templateTitle?: string;
  templateEmoji?: string;
  questions: QuizQuestion[];
};

export default function OwnerQuizPage() {
  const params = useParams();
  const id = params?.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const playLink = useMemo(() => {
    if (typeof window === "undefined" || !id) return "";
    return `${window.location.origin}/play/${id}`;
  }, [id]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!id) return;

        const ref = doc(db, "quizzes", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setQuiz(snap.data() as Quiz);
        } else {
          setQuiz(null);
        }
      } catch (error) {
        console.error(error);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(playLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error(error);
      alert("Nuk u kopjua linku");
    }
  };

  const shareWhatsApp = () => {
    const text = `🔥 A më njeh mirë?\nProvoje quizin tim 👇\n${playLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-4xl mb-3">💚</div>
          <p className="text-lg text-zinc-300">Duke ngarkuar...</p>
        </div>
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] text-white flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-6">
          <div className="text-4xl mb-3">😕</div>
          <h1 className="text-2xl font-bold mb-2">Quiz nuk u gjet</h1>
          <p className="text-zinc-400">
            Linku mund të jetë i gabuar ose quiz-i nuk ekziston më.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0f] px-4 py-8 text-white">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{quiz.templateEmoji || "💚"}</div>
          <h1 className="text-3xl font-bold mb-2">Quiz u krijua me sukses</h1>
          <p className="text-zinc-400">
            Tani dërgoja linkun shokëve që ta luajnë.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-4">
            <p className="text-sm text-zinc-400 mb-1">Quiz për</p>
            <p className="text-xl font-bold truncate">{quiz.name}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-4">
            <p className="text-sm text-zinc-400 mb-1">Pyetje</p>
            <p className="text-xl font-bold">{quiz.questions.length}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5 mb-5">
          <p className="text-sm text-zinc-400 mb-2">Kategoria</p>
          <div className="mb-4 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
            {quiz.templateTitle || "Sfida e miqësisë"}
          </div>

          <p className="text-sm text-zinc-400 mb-2">Linku yt</p>
          <div className="rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-sm break-all text-zinc-200">
            {playLink}
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <button
            onClick={copyLink}
            className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black"
          >
            {copied ? "✅ Linku u kopjua" : "🔗 Kopjo linkun"}
          </button>

          <button
            onClick={shareWhatsApp}
            className="w-full rounded-2xl bg-green-500 py-4 text-lg font-bold text-black"
          >
            WhatsApp
          </button>

          <a
            href={playLink}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-2xl border border-zinc-700 bg-[#111116] py-4 text-center text-lg font-bold text-white"
          >
            ▶️ Hap quizin
          </a>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5">
          <h2 className="text-xl font-bold mb-3 text-center">Si funksionon?</h2>

          <div className="space-y-2 text-zinc-300 text-sm sm:text-base">
            <p>1. Kopjo ose dërgo linkun te shokët</p>
            <p>2. Ata futen dhe përgjigjen</p>
            <p>3. Në fund shohin sa mirë të njohin</p>
            <p>4. Ti teston kush del më lart në rezultat</p>
          </div>
        </div>
      </div>
    </main>
  );
}