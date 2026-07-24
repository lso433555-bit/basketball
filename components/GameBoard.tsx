"use client";

import { useEffect, useState } from "react";
import GuessInput from "@/components/GuessInput";
import ColorLegend from "@/components/ColorLegend";
import AttemptSlots from "@/components/AttemptSlots";
import HintPanel from "@/components/HintPanel";
import GameResult from "@/components/GameResult";
import { submitGuessAction, getHintsAction, revealAnswerAction } from "@/app/actions";
import type { HintData } from "@/lib/hints";
import type { Attempt, Player } from "@/lib/types";

const TOTAL_ATTEMPTS = 8;
const STORAGE_KEY = "nongquiz-round";

type GameStatus = "playing" | "won" | "lost";

interface SavedRound {
  seed: string;
  attempts: Attempt[];
  status: GameStatus;
}

function createSeed(): string {
  return crypto.randomUUID();
}

/** localStorage 읽기를 비동기 콜백 뒤로 미뤄, 이펙트 본문에서 곧바로 setState하지 않게 한다. */
async function loadSavedRound(): Promise<SavedRound | null> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedRound;
  } catch {
    return null;
  }
}

export default function GameBoard() {
  // seed가 null인 동안(마운트 직후 잠깐)은 아직 이번 판이 정해지지 않은 상태 — 입력을 막아둔다.
  const [seed, setSeed] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [hints, setHints] = useState<HintData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealedPlayer, setRevealedPlayer] = useState<Player | null>(null);

  const guessedIds = new Set(attempts.map((a) => a.player.id));

  // 마운트 시: 진행 중이던 판이 저장돼 있으면 이어서, 없으면 새 랜덤 시드로 새 판을 시작한다.
  useEffect(() => {
    loadSavedRound().then((saved) => {
      if (saved) {
        setSeed(saved.seed);
        setAttempts(saved.attempts);
        setStatus(saved.status);
      } else {
        setSeed(createSeed());
      }
    });
  }, []);

  // 진행 상황이 바뀔 때마다 저장 (새로고침해도 같은 판이 유지되도록)
  useEffect(() => {
    if (!seed) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ seed, attempts, status }));
  }, [seed, attempts, status]);

  useEffect(() => {
    if (!seed) return;
    getHintsAction(seed, attempts.length).then(setHints);
  }, [seed, attempts.length]);

  useEffect(() => {
    if (seed && status === "lost") {
      revealAnswerAction(seed).then(setRevealedPlayer);
    }
  }, [seed, status]);

  const handleGuess = async (player: Player) => {
    if (!seed || status !== "playing" || guessedIds.has(player.id) || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { result, isWin } = await submitGuessAction(seed, player.id);
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

  // 다시하기: 같은 정답을 재도전하는 게 아니라, 완전히 새로운 랜덤 선수로 새 판을 시작한다.
  const handleReset = () => {
    setSeed(createSeed());
    setAttempts([]);
    setStatus("playing");
    setHints({});
    setRevealedPlayer(null);
  };

  // 이긴 경우엔 서버에서 정답을 다시 받아올 필요 없음 — 방금 맞힌 선수 자체가 정답이므로
  const winningAttempt = status === "won" ? attempts[attempts.length - 1] : null;

  return (
    <div className="flex w-full flex-col gap-4">
      <GuessInput
        onSubmit={handleGuess}
        disabled={!seed || status !== "playing" || isSubmitting}
        guessedIds={guessedIds}
      />

      <ColorLegend />

      {status === "won" && winningAttempt && (
        <GameResult
          status="won"
          player={winningAttempt.player}
          attempts={attempts}
          onReset={handleReset}
        />
      )}
      {status === "lost" &&
        (revealedPlayer ? (
          <GameResult
            status="lost"
            player={revealedPlayer}
            attempts={attempts}
            onReset={handleReset}
          />
        ) : (
          <div className="rounded-2xl border border-card-border bg-card px-4 py-3 text-center text-sm text-zinc-400">
            아쉬워요! 정답을 확인하는 중...
          </div>
        ))}

      <HintPanel hints={hints} />

      <AttemptSlots attempts={attempts} totalSlots={TOTAL_ATTEMPTS} />
    </div>
  );
}
