"use client";

import { useState } from "react";
import GuessInput from "@/components/GuessInput";
import AttemptSlots from "@/components/AttemptSlots";
import { comparePlayer, isWinningGuess, type ComparisonResult } from "@/lib/compare";
import type { Player } from "@/lib/types";

const TOTAL_ATTEMPTS = 8;

export interface Attempt {
  player: Player;
  result: ComparisonResult;
}

type GameStatus = "playing" | "won" | "lost";

interface GameBoardProps {
  answer: Player;
}

export default function GameBoard({ answer }: GameBoardProps) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");

  const guessedIds = new Set(attempts.map((a) => a.player.id));

  const handleGuess = (player: Player) => {
    if (status !== "playing" || guessedIds.has(player.id)) return;

    const result = comparePlayer(player, answer);
    const nextAttempts = [...attempts, { player, result }];
    setAttempts(nextAttempts);

    if (isWinningGuess(result)) {
      setStatus("won");
    } else if (nextAttempts.length >= TOTAL_ATTEMPTS) {
      setStatus("lost");
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <GuessInput
        onSubmit={handleGuess}
        disabled={status !== "playing"}
        guessedIds={guessedIds}
      />

      {status === "won" && (
        <div className="rounded-xl border border-emerald-500 bg-emerald-600/20 px-4 py-3 text-center text-sm text-emerald-300">
          🎉 정답입니다! {attempts.length}번 만에 {answer.name}을(를) 맞혔어요.
        </div>
      )}
      {status === "lost" && (
        <div className="rounded-xl border border-red-500 bg-red-600/20 px-4 py-3 text-center text-sm text-red-300">
          아쉬워요! 정답은 {answer.name}였어요.
        </div>
      )}

      <AttemptSlots attempts={attempts} totalSlots={TOTAL_ATTEMPTS} />
    </div>
  );
}
