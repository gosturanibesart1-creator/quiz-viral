"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import { dbLite } from "@/lib/firebase-lite";
import { QuizTemplateOption } from "@/lib/quizTemplates";

type Question = {
  question: string;
  options: QuizTemplateOption[];
  correctIndex: number;
};

type Quiz = {
  name: string;
  templateTitle?: string;
  templateEmoji?: string;
  questions: Question[];
};

export default function PlayQuizPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== -1).length,
    [answers]
  );

  const loadQuiz = async () => {
    if (!id) {
      setFetchError("Linku i quiz-it mungon.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setFetchError("");

      const ref = doc(dbLite, "quizzes", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setQuiz(null);
        setFetchError("Quiz nuk u gjet.");
        return;
      }

      const data = snap.data() as Quiz;

      if (!data?.questions?.length) {
        setQuiz(null);
        setFetchError("Quiz është bosh ose i prishur.");
        return;
      }

      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(-1));
    } catch (error) {
      console.error("Gabim gjatë leximit të quiz-it:", error);
      setQuiz(null);
      setFetchError("Gabim gjatë ngarkimit të quiz-it.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchWithTimeout = async () => {
      if (!id) {
        setFetchError("Linku i quiz-it mungon.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setFetchError("");

      const timeout = setTimeout(() => {
        if (!cancelled) {
          setLoading(false);
          setFetchError("Ngarkimi po zgjat shumë. Provo përsëri.");
        }
      }, 8000);

      try {
        const ref = doc(dbLite, "quizzes", id);
        const snap = await getDoc(ref);

        if (cancelled) return;

        clearTimeout(timeout);

        if (!snap.exists()) {
          setQuiz(null);
          setFetchError("Quiz nuk u gjet.");
          return;
        }

        const data = snap.data() as Quiz;

        if (!data?.questions?.length) {
          setQuiz(null);
          setFetchError("Quiz është bosh ose i prishur.");
          return;
        }

        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(-1));
        setFetchError("");
      } catch (error) {
        if (cancelled) return;

        clearTimeout(timeout);
        console.error("Gabim gjatë leximit të quiz-it:", error);
        setQuiz(null);
        setFetchError("Gabim gjatë ngarkimit të quiz-it.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchWithTimeout();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const startQuiz = () => {
    if (!playerName.trim()) {
      alert("Shkruaj emrin tënd.");
      return;
    }
    setStarted(true);
  };

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentStep] = optionIndex;
      return copy;
    });

    const isLast = currentStep === (quiz?.questions.length || 1) - 1;

    if (!isLast) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 180);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    if (!playerName.trim()) {
      alert("Shkruaj emrin tënd.");
      return;
    }

    if (answers.some((a) => a === -1)) {
      alert("Përgjigju të gjitha pyetjeve.");
      return;
    }

    try {
      setSubmitting(true);

      let score = 0;

      quiz.questions.forEach((q, i) => {
        if (answers[i] === q.correctIndex) {
          score++;
        }
      });

      const resultRef = await addDoc(collection(db, "results"), {
        quizId: id,
        name: playerName.trim(),
        score,
        total: quiz.questions.length,
        answers,
        createdAt: Date.now(),
      });

      router.push(`/result/${id}/${resultRef.id}`);
    } catch (error) {
      console.error("Gabim gjatë dërgimit:", error);
      alert("Gabim gjatë dërgimit.");
    } finally {
      setSubmitting(false);
    }
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

  if (fetchError || !quiz) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] text-white flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-6">
          <div className="text-4xl mb-3">😕</div>
          <h1 className="text-2xl font-bold mb-2">
            {fetchError || "Quiz nuk u gjet"}
          </h1>
          <p className="text-zinc-400 mb-5">
            Provo përsëri ose hape linkun direkt në Safari.
          </p>

          <button
            onClick={loadQuiz}
            className="w-full rounded-2xl bg-green-500 py-4 text-lg font-bold text-black"
          >
            Provo përsëri
          </button>
        </div>
      </main>
    );
  }

  const currentQuestion = quiz.questions[currentStep];
  const isLastStep = currentStep === quiz.questions.length - 1;
  const manyOptions = currentQuestion.options.length > 8;
  const mediumOptions =
    currentQuestion.options.length > 4 && currentQuestion.options.length <= 8;

  if (!started) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] px-4 py-8 text-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{quiz.templateEmoji || "💚"}</div>
            <h1 className="text-3xl font-semibold mb-2">
              {quiz.templateTitle || "Sfida e miqësisë"}
            </h1>
            <p className="text-zinc-400">Sa mirë e njeh {quiz.name}?</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5">
            <h2 className="text-3xl font-semibold text-center mb-3">
              Fillo quizin
            </h2>

            <p className="text-center text-zinc-400 mb-5">
              Shkruaj emrin dhe vazhdo
            </p>

            <input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Emri yt"
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-xl outline-none focus:border-green-500 mb-4"
            />

            <button
              onClick={startQuiz}
              className="w-full rounded-2xl bg-green-500 py-4 text-xl font-bold text-black"
            >
              Fillo 👉
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0f] px-4 py-8 text-white">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{quiz.templateEmoji || "💚"}</div>
          <h1 className="text-3xl font-semibold mb-2">
            {quiz.templateTitle || "Sfida e miqësisë"}
          </h1>
          <p className="text-zinc-400">Sa mirë e njeh {quiz.name}?</p>
        </div>

        <div className="mb-5 overflow-x-auto">
          <div className="flex min-w-max items-center justify-center gap-2 px-1">
            {quiz.questions.map((_, i) => {
              const done = answers[i] !== -1;
              const active = i === currentStep;

              return (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold transition ${
                    active
                      ? "bg-green-500 text-black"
                      : done
                      ? "bg-green-500/20 border border-green-500 text-green-400"
                      : "bg-[#1a1a1f] border border-zinc-800 text-white"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1f] p-5">
          <h2 className="mb-3 text-center text-3xl font-semibold leading-tight">
            {currentQuestion.question}
          </h2>

          <p className="mb-5 text-center text-zinc-400">
            Përgjigjur: {answeredCount}/{quiz.questions.length}
          </p>

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
            {currentQuestion.options.map((option, optionIndex) => {
              const active = answers[currentStep] === optionIndex;

              return (
                <button
                  key={optionIndex}
                  onClick={() => selectAnswer(optionIndex)}
                  className={`rounded-2xl border px-4 py-4 text-center transition active:scale-95 min-h-[84px] flex flex-col items-center justify-center ${
                    active
                      ? "border-green-500 bg-green-500 text-black"
                      : "border-zinc-800 bg-black text-white"
                  }`}
                >
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="text-sm sm:text-base font-semibold leading-snug">
                    {option.label}
                  </div>
                </button>
              );
            })}
          </div>

          {isLastStep && answers[currentStep] !== -1 && (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-6 w-full rounded-2xl bg-green-500 px-6 py-5 text-2xl font-bold text-black disabled:opacity-50"
            >
              {submitting ? "Duke dërguar..." : "Dërgo përgjigjet 🚀"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}