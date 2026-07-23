"use client";

import { useMemo } from "react";
import Confetti from "@/components/Confetti";
import StatsCard from "@/components/StatsCard";
import ShareButton from "@/components/ShareButton";
import { getInitials } from "@/lib/hints";
import { buildShareText } from "@/lib/share";
import type { Attempt, Player } from "@/lib/types";

interface GameResultProps {
  status: "won" | "lost";
  player: Player;
  attempts: Attempt[];
  gameNumber: number;
}

export default function GameResult({ status, player, attempts, gameNumber }: GameResultProps) {
  const shareText = useMemo(
    () => buildShareText(gameNumber, attempts, status),
    [gameNumber, attempts, status]
  );

  return (
    <div className="relative flex flex-col gap-3 overflow-hidden rounded-xl border border-card-border bg-card p-4">
      {status === "won" && <Confetti />}

      <div className="flex flex-col items-center gap-2 py-2">
        <div className="animate-badge-pop flex h-20 w-20 items-center justify-center rounded-full border-2 border-court-orange bg-court-orange-dim">
          <span className="font-display text-2xl text-white">
            {getInitials(player.nameEn)}
          </span>
        </div>
        <p className="text-center text-sm text-foreground">
          {status === "won"
            ? `🎉 정답입니다! ${attempts.length}번 만에 ${player.name}을(를) 맞혔어요.`
            : `아쉬워요! 정답은 ${player.name}였어요.`}
        </p>
      </div>

      <StatsCard player={player} />

      <pre className="whitespace-pre-wrap rounded-lg bg-background/60 p-3 text-center font-mono text-sm">
        {shareText}
      </pre>
      <ShareButton text={shareText} />
    </div>
  );
}
