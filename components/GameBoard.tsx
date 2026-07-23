"use client";

import { useEffect, useState } from "react";
import GuessInput from "@/components/GuessInput";
import AttemptSlots from "@/components/AttemptSlots";
import HintPanel from "@/components/HintPanel";
import { submitGuessAction, getHintsAction, revealAnswerAction } from "@/app/actions";
import type { ComparisonResult } from "@/lib/compare";
import type { HintData } from "@/lib/hints";
import type { Player } from "@/lib/types";

const TOTAL_ATTEMPTS = 8;

export interface Attempt {
  player: Player;
  result: ComparisonResult;
}

type GameStatus = "playing" | "won" | "lost";

export default function GameBoard() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [hints, setHints] = useState<HintData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealedName, setRevealedName] = useState<string | null>(null);

  const guessedIds = new Set(attempts.map((a) => a.player.id));

  useEffect(() => {
    getHintsAction(attempts.length).then(setHints);
  }, [attempts.length]);

  useEffect(() => {
    if (status === "lost") {
      revealAnswerAction().then((data) => setRevealedName(data.name));
    }
  }, [status]);

  const handleGuess = async (player: Player) => {
    if (status !== "playing" || guessedIds.has(player.id) || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { result, isWin } = await submitGuessAction(player.id);
      const nextAttempts = [...attempts, { player, result }];
      setAttempts(nextAttempts);

      if (isWin) {
        setStatus("won");
      } else if (nextAttempts.length >= TOTAL_ATTEMPTS) {
        setStatus("lost");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 이긴 경우엔 서버에서 정답을 다시 받아올 필요 없음 — 방금 맞힌 선수 자체가 정답이므로
  const winningAttempt = status === "won" ? attempts[attempts.length - 1] : null;

  return (
    <div className="flex w-full flex-col gap-4">
      <GuessInput
        onSubmit={handleGuess}
        disabled={status !== "playing" || isSubmitting}
        guessedIds={guessedIds}
      />

      {status === "won" && winningAttempt && (
        <div className="rounded-xl border border-emerald-500 bg-emerald-600/20 px-4 py-3 text-center text-sm text-emerald-300">
          🎉 정답입니다! {attempts.length}번 만에 {winningAttempt.player.name}을(를) 맞혔어요.
        </div>
      )}
      {status === "lost" && (
        <div className="rounded-xl border border-red-500 bg-red-600/20 px-4 py-3 text-center text-sm text-red-300">
          {revealedName
            ? `아쉬워요! 정답은 ${revealedName}였어요.`
            : "아쉬워요! 정답을 확인하는 중..."}
        </div>
      )}

      <HintPanel hints={hints} />

      <AttemptSlots attempts={attempts} totalSlots={TOTAL_ATTEMPTS} />
    </div>
  );
}
