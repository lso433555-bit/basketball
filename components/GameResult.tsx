"use client";

import { useMemo } from "react";
import StatsCard from "@/components/StatsCard";
import ShareButton from "@/components/ShareButton";
import { buildShareText } from "@/lib/share";
import type { Attempt, Player } from "@/lib/types";

interface GameResultProps {
  status: "won" | "lost";
  player: Player;
  attempts: Attempt[];
  gameNumber: number;
  onReset: () => void;
}

export default function GameResult({
  status,
  player,
  attempts,
  gameNumber,
  onReset,
}: GameResultProps) {
  const shareText = useMemo(
    () => buildShareText(gameNumber, attempts, status),
    [gameNumber, attempts, status]
  );

  return (
    <div className="flex flex-col gap-3">
      <StatsCard player={player} status={status} attemptCount={attempts.length} />

      <ShareButton text={shareText} />

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-2xl border border-card-border-strong bg-card/60 px-4 py-3 font-semibold text-zinc-300 transition-colors hover:bg-card active:scale-[0.98]"
      >
        🔄 다시하기
      </button>
    </div>
  );
}
