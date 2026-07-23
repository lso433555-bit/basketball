"use client";

import { useEffect, useState } from "react";
import GuessInput from "@/components/GuessInput";
import AttemptSlots from "@/components/AttemptSlots";
import HintPanel from "@/components/HintPanel";
import GameResult from "@/components/GameResult";
import { submitGuessAction, getHintsAction, revealAnswerAction } from "@/app/actions";
import type { HintData } from "@/lib/hints";
import type { Attempt, Player } from "@/lib/types";

const TOTAL_ATTEMPTS = 8;
const STORAGE_KEY_PREFIX = "nongquiz-game-";

type GameStatus = "playing" | "won" | "lost";

interface SavedGame {
  attempts: Attempt[];
  status: GameStatus;
}

interface GameBoardProps {
  gameNumber: number;
}

/** localStorage 읽기를 비동기 콜백 뒤로 미뤄, 이펙트 본문에서 곧바로 setState하지 않게 한다. */
async function loadSavedGame(gameNumber: number): Promise<SavedGame | null> {
  const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${gameNumber}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedGame;
  } catch {
    return null;
  }
}

export default function GameBoard({ gameNumber }: GameBoardProps) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [hints, setHints] = useState<HintData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealedPlayer, setRevealedPlayer] = useState<Player | null>(null);

  const guessedIds = new Set(attempts.map((a) => a.player.id));

  // 오늘(gameNumber) 게임 진행 상황을 마운트 시 복원한다. 날짜가 바뀌면(gameNumber가
  // 달라지면) 다른 키를 찾게 되어 자동으로 새 게임으로 시작된다.
  useEffect(() => {
    loadSavedGame(gameNumber).then((saved) => {
      if (!saved) return;
      setAttempts(saved.attempts);
      setStatus(saved.status);
    });
  }, [gameNumber]);

  // 진행 상황이 바뀔 때마다 저장 (새로고침해도 유지되도록)
  useEffect(() => {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${gameNumber}`,
      JSON.stringify({ attempts, status })
    );
  }, [attempts, status, gameNumber]);

  useEffect(() => {
    getHintsAction(attempts.length).then(setHints);
  }, [attempts.length]);

  useEffect(() => {
    if (status === "lost") {
      revealAnswerAction().then(setRevealedPlayer);
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
        <GameResult
          status="won"
          player={winningAttempt.player}
          attempts={attempts}
          gameNumber={gameNumber}
        />
      )}
      {status === "lost" &&
        (revealedPlayer ? (
          <GameResult
            status="lost"
            player={revealedPlayer}
            attempts={attempts}
            gameNumber={gameNumber}
          />
        ) : (
          <div className="rounded-xl border border-card-border bg-card px-4 py-3 text-center text-sm text-zinc-400">
            아쉬워요! 정답을 확인하는 중...
          </div>
        ))}

      <HintPanel hints={hints} />

      <AttemptSlots attempts={attempts} totalSlots={TOTAL_ATTEMPTS} />
    </div>
  );
}
