"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Result = {
  name: string;
  score: number;
  total: number;
};

type ShareNavigator = Navigator & {
  share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
};

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();

  const quizId = params?.quizId as string;
  const resultId = params?.resultId as string;

  const [result, setResult] = useState<Result | null>(null);
  const [leaderboard, setLeaderboard] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultRef = doc(db, "results", resultId);
        const resultSnap = await getDoc(resultRef);

        if (!resultSnap.exists()) {
          alert("Rezultati nuk u gjet");
          return;
        }

        const current = resultSnap.data() as Result;
        setResult(current);

        const q = query(
          collection(db, "results"),
          where("quizId", "==", quizId)
        );

        const snap = await getDocs(q);

        const all: Result[] = [];
        snap.forEach((docItem) => {
          all.push(docItem.data() as Result);
        });

        all.sort((a, b) => b.score - a.score);
        setLeaderboard(all.slice(0, 10));
      } catch (err) {
        console.error(err);
        alert("Gabim gjatë ngarkimit");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId, resultId]);

  const playLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/play/${quizId}`
      : "";

  const shareText = `🔥 Sa mirë më njeh?\nProvoje quizin tim dhe futu në leaderboard 👇\n${playLink}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(playLink);
      alert("Linku u kopjua 🔥");
      return true;
    } catch (error) {
      console.error(error);
      alert("Nuk u kopjua linku");
      return false;
    }
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const shareSnapchat = () => {
    const url = `https://www.snapchat.com/share?link=${encodeURIComponent(
      playLink
    )}`;
    window.open(url, "_blank");
  };

  const shareInstagram = async () => {
    try {
      const nav = navigator as ShareNavigator;

      if (nav.share) {
        await nav.share({
          title: "Sfida e miqësisë",
          text: "🔥 Sa mirë më njeh? Provoje quizin tim",
          url: playLink,
        });
        return;
      }

      const copied = await copyLink();
      if (copied) {
        alert("Linku u kopjua — hape Instagram dhe bëj paste 🔥");
      }
    } catch (error) {
      console.error(error);
      const copied = await copyLink();
      if (copied) {
        alert("Linku u kopjua — hape Instagram dhe bëj paste 🔥");
      }
    }
  };

  const shareAnywhere = async () => {
    try {
      const nav = navigator as ShareNavigator;

      if (nav.share) {
        await nav.share({
          title: "Sfida e miqësisë",
          text: "🔥 Sa mirë më njeh? Provoje quizin tim",
          url: playLink,
        });
        return;
      }

      await copyLink();
    } catch (error) {
      console.error(error);
      await copyLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!result) return null;

  const percent = Math.round((result.score / result.total) * 100);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">💚</div>
          <h1 className="text-3xl font-bold">Rezultati yt</h1>
          <p className="text-zinc-400">
            {result.score}/{result.total} pikë
          </p>
        </div>

        <div className="mb-6 rounded-[30px] bg-[#111] border border-zinc-800 p-6 text-center">
          <div className="text-5xl font-extrabold mb-2">{percent}%</div>

          <p className="text-zinc-400 mb-4">Sa mirë e gjete?</p>

          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="mb-6 rounded-[30px] bg-[#111] border border-zinc-800 p-5">
          <h2 className="text-xl font-bold mb-4 text-center">
            🏆 Top lojtarët
          </h2>

          <div className="space-y-2">
            {leaderboard.map((p, i) => {
              const isYou =
                p.name === result.name && p.score === result.score;

              return (
                <div
                  key={i}
                  className={`flex justify-between px-4 py-3 rounded-xl ${
                    isYou
                      ? "bg-green-500 text-black"
                      : "bg-black border border-zinc-800"
                  }`}
                >
                  <span>
                    {i + 1}. {p.name}
                  </span>
                  <span>{p.score}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 rounded-[30px] bg-[#111] border border-zinc-800 p-5">
          <h2 className="text-xl font-bold mb-4 text-center">Shpërndaje 🔥</h2>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={shareWhatsApp}
              className="rounded-2xl bg-green-500 py-4 px-2 text-black font-bold text-sm"
            >
              WhatsApp
            </button>

            <button
              onClick={shareInstagram}
              className="rounded-2xl bg-pink-500 py-4 px-2 text-white font-bold text-sm"
            >
              Instagram
            </button>

            <button
              onClick={shareSnapchat}
              className="rounded-2xl bg-yellow-400 py-4 px-2 text-black font-bold text-sm"
            >
              Snapchat
            </button>
          </div>

          <button
            onClick={shareAnywhere}
            className="mt-3 w-full bg-[#1a1a1f] border border-zinc-700 py-4 rounded-2xl text-lg font-semibold"
          >
            🔗 Share / Kopjo linkun
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/create")}
            className="w-full bg-white text-black py-4 rounded-2xl text-xl font-bold"
          >
            👉 Krijo quizin tënd
          </button>
        </div>
      </div>
    </main>
  );
}