"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type QuizQuestion = {
  question: string;
  options: { label: string; emoji: string }[] | string[];
  correctIndex: number;
};

type Quiz = {
  name: string;
  questions: QuizQuestion[];
};

export default function OwnerQuizPage() {
  const params = useParams();
  const id = params?.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const playLink =
    typeof window !== "undefined" ? `${window.location.origin}/play/${id}` : "";

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const ref = doc(db, "quizzes", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setQuiz(snap.data() as Quiz);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchQuiz();
  }, [id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(playLink);
      alert("Linku u kopjua ✅");
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
      <main className="min-h-screen bg-[#0c0c0f] text-white flex items-center justify-center">
        Duke ngarkuar...
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] text-white flex items-center justify-center">
        Quiz nuk u gjet.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0f] px-4 py-8 text-white">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">💚</div>
          <h1 className="text-3xl font-bold mb-2">Quiz u krijua me sukses</h1>
          <p className="text-zinc-400">
            Tani dërgoja linkun shokëve që ta luajnë.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5 mb-5">
          <p className="text-sm text-zinc-400 mb-2">Quiz për:</p>
          <h2 className="text-3xl font-bold mb-4">{quiz.name}</h2>

          <p className="text-sm text-zinc-400 mb-2">Linku yt:</p>
          <div className="rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-sm break-all">
            {playLink}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={copyLink}
            className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black"
          >
            🔗 Kopjo linkun
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
            className="block w-full rounded-2xl bg-[#1a1a1f] border border-zinc-700 py-4 text-center text-lg font-bold text-white"
          >
            ▶️ Hap quizin
          </a>
        </div>
      </div>
    </main>
  );
}