import type { Player } from "@/lib/types";

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
}

function compareTeam(guess: Player, answer: Player): StatResult {
  if (guess.team === answer.team) return { status: "correct" };
  const sharedTeam = guess.teamHistory.some((t) => answer.teamHistory.includes(t));
  return { status: sharedTeam ? "close" : "wrong" };
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

export function comparePlayer(guess: Player, answer: Player): ComparisonResult {
  return {
    team: compareTeam(guess, answer),
    position: comparePosition(guess, answer),
    height: compareNumeric(guess.heightCm, answer.heightCm, 0, 3),
    careerFgPct: compareNumeric(guess.careerFgPct, answer.careerFgPct, 1, 3),
    careerPts: compareNumeric(guess.careerPts, answer.careerPts, 1000, 3000),
    careerRebounds: compareNumeric(guess.careerRebounds, answer.careerRebounds, 500, 1500),
    careerAssists: compareNumeric(guess.careerAssists, answer.careerAssists, 350, 1000),
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
    result.careerAssists.status === "correct"
  );
}
