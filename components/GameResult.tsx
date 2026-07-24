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
}

export default function GameResult({ status, player, attempts, gameNumber }: GameResultProps) {
  const shareText = useMemo(
    () => buildShareText(gameNumber, attempts, status),
    [gameNumber, attempts, status]
  );

  return (
    <div className="flex flex-col gap-3">
      <StatsCard player={player} status={status} attemptCount={attempts.length} />

      <pre className="rounded-xl border border-card-border/60 bg-background/60 p-3 text-center font-mono text-sm whitespace-pre-wrap">
        {shareText}
      </pre>
      <ShareButton text={shareText} />
    </div>
  );
}
