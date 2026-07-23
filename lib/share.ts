import type { Status } from "@/lib/compare";
import type { Attempt } from "@/lib/types";

const STATUS_EMOJI: Record<Status, string> = {
  correct: "🟩",
  close: "🟨",
  wrong: "🟥",
};

const TOTAL_ATTEMPTS = 8;

/** 워들 스타일 결과 공유 텍스트를 생성한다. 정답/힌트 등 민감 정보는 전혀 포함하지 않는다. */
export function buildShareText(
  gameNumber: number,
  attempts: Attempt[],
  status: "won" | "lost"
): string {
  const usedLabel =
    status === "won" ? `${attempts.length}/${TOTAL_ATTEMPTS}` : `X/${TOTAL_ATTEMPTS}`;

  const lines = attempts.map((attempt) =>
    [
      attempt.result.team,
      attempt.result.position,
      attempt.result.height,
      attempt.result.careerFgPct,
      attempt.result.careerPts,
    ]
      .map((stat) => STATUS_EMOJI[stat.status])
      .join("")
  );

  return [`농퀴즈 #${gameNumber} ${usedLabel}`, ...lines].join("\n");
}
