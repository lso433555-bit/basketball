"use server";

import { getPlayerForSeed } from "@/lib/game";
import { findPlayerById } from "@/lib/search";
import { comparePlayer, isWinningGuess, type ComparisonResult } from "@/lib/compare";
import { getUnlockedHints, getInitials, stripDraftYear, type HintData } from "@/lib/hints";
import type { Player } from "@/lib/types";

export interface SubmitGuessResult {
  result: ComparisonResult;
  isWin: boolean;
}

/** 이번 판(seed)의 정답은 여기서만 조회된다 — 클라이언트로는 비교 결과만 전달된다. */
export async function submitGuessAction(
  seed: string,
  playerId: string
): Promise<SubmitGuessResult> {
  const guess = findPlayerById(playerId);
  if (!guess) {
    throw new Error("알 수 없는 선수입니다.");
  }

  const answer = getPlayerForSeed(seed);
  const result = comparePlayer(guess, answer);
  return { result, isWin: isWinningGuess(result) };
}

/** 현재 시도 횟수 기준으로 해금된 힌트의 데이터만 반환한다 (잠긴 힌트는 필드 자체가 없음). */
export async function getHintsAction(seed: string, attemptCount: number): Promise<HintData> {
  const answer = getPlayerForSeed(seed);
  const unlocked = getUnlockedHints(attemptCount);
  const data: HintData = {};

  if (unlocked.includes("awards")) {
    data.awards = { awards: answer.awards };
  }
  if (unlocked.includes("initials")) {
    data.initials = { initials: getInitials(answer.nameEn) };
  }
  if (unlocked.includes("draftPick")) {
    data.draftPick = { draftPick: stripDraftYear(answer.draftPick) };
  }

  return data;
}

/** 게임이 lost로 끝났을 때만 호출되어 정답 선수의 전체 정보를 공개한다 (통계 카드용). */
export async function revealAnswerAction(seed: string): Promise<Player> {
  return getPlayerForSeed(seed);
}
