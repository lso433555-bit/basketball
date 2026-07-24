import type { Player } from "@/lib/types";
import { getDraftYear } from "@/lib/playerDisplay";

export type Status = "correct" | "close" | "wrong";
export type Direction = "up" | "down";

export interface StatResult {
  status: Status;
  direction?: Direction;
}

export interface ComparisonResult {
  team: StatResult;
  position: StatResult;
  height: StatResult;
  careerFgPct: StatResult;
  careerPts: StatResult;
  careerRebounds: StatResult;
  careerAssists: StatResult;
  draftYear: StatResult;
}

/** 소속팀은 과거 이력과 무관하게 "현재 소속팀이 같은가"만 본다 — 다른 시대에 스쳐간 팀 하나만 겹쳐도 근접(노랑)으로 뜨는 혼란을 없애기 위함. */
function compareTeam(guess: Player, answer: Player): StatResult {
  return { status: guess.team === answer.team ? "correct" : "wrong" };
}

function splitPositions(position: string): string[] {
  return position.split("-");
}

function comparePosition(guess: Player, answer: Player): StatResult {
  if (guess.position === answer.position) return { status: "correct" };
  const guessPositions = splitPositions(guess.position);
  const answerPositions = splitPositions(answer.position);
  const overlap = guessPositions.some((p) => answerPositions.includes(p));
  return { status: overlap ? "close" : "wrong" };
}

function compareNumeric(
  guessValue: number,
  answerValue: number,
  correctThreshold: number,
  closeThreshold: number
): StatResult {
  const diff = answerValue - guessValue;
  const absDiff = Math.abs(diff);

  if (absDiff <= correctThreshold) return { status: "correct" };

  const direction: Direction = diff > 0 ? "up" : "down";
  if (absDiff <= closeThreshold) return { status: "close", direction };
  return { status: "wrong", direction };
}

function compareDraftYear(guess: Player, answer: Player): StatResult {
  const guessYear = getDraftYear(guess.draftPick);
  const answerYear = getDraftYear(answer.draftPick);

  if (guessYear === null && answerYear === null) return { status: "correct" };
  if (guessYear === null || answerYear === null) return { status: "wrong" };
  return compareNumeric(guessYear, answerYear, 0, 5);
}

export function comparePlayer(guess: Player, answer: Player): ComparisonResult {
  return {
    team: compareTeam(guess, answer),
    position: comparePosition(guess, answer),
    height: compareNumeric(guess.heightCm, answer.heightCm, 0, 3),
    careerFgPct: compareNumeric(guess.careerFgPct, answer.careerFgPct, 0.5, 3),
    careerPts: compareNumeric(guess.careerPts, answer.careerPts, 250, 2500),
    careerRebounds: compareNumeric(guess.careerRebounds, answer.careerRebounds, 150, 1200),
    careerAssists: compareNumeric(guess.careerAssists, answer.careerAssists, 100, 800),
    draftYear: compareDraftYear(guess, answer),
  };
}

export function isWinningGuess(result: ComparisonResult): boolean {
  return (
    result.team.status === "correct" &&
    result.position.status === "correct" &&
    result.height.status === "correct" &&
    result.careerFgPct.status === "correct" &&
    result.careerPts.status === "correct" &&
    result.careerRebounds.status === "correct" &&
    result.careerAssists.status === "correct" &&
    result.draftYear.status === "correct"
  );
}
