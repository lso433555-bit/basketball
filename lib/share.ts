import type { Status } from "@/lib/compare";
import type { Attempt } from "@/lib/types";

const STATUS_EMOJI: Record<Status, string> = {
  correct: "🟩",
  close: "🟨",
  wrong: "🟥",
};

const TOTAL_ATTEMPTS = 8;

/** 워들 스타일 결과 공유 텍스트를 생성한다. 게임이 끝난 뒤에만 호출되므로(정답 이미 화면에 공개) 정답 이름을 포함해도 안전하다. */
export function buildShareText(
  attempts: Attempt[],
  status: "won" | "lost",
  answerName: string
): string {
  const usedLabel =
    status === "won" ? `${attempts.length}/${TOTAL_ATTEMPTS}` : `X/${TOTAL_ATTEMPTS}`;

  const lines = attempts.map((attempt, i) => {
    const emojis = [
      attempt.result.team,
      attempt.result.position,
      attempt.result.height,
      attempt.result.careerFgPct,
      attempt.result.careerPts,
      attempt.result.careerRebounds,
      attempt.result.careerAssists,
      attempt.result.draftYear,
    ]
      .map((stat) => STATUS_EMOJI[stat.status])
      .join("");

    return `${i + 1}. ${attempt.player.name} ${emojis}`;
  });

  return [`농퀴즈 ${usedLabel} (정답: ${answerName})`, ...lines].join("\n");
}
