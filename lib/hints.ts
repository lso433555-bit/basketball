export type HintLevel = "awards" | "initials" | "draftPick";

/** 각 힌트가 해금되는 시도 횟수 기준값. */
export const HINT_THRESHOLDS: Record<HintLevel, number> = {
  awards: 4,
  initials: 6,
  draftPick: 7,
};

const HINT_ORDER: HintLevel[] = ["awards", "initials", "draftPick"];

/** 지금까지의 시도 횟수를 기준으로 해금된 힌트 목록을 반환한다 (누적, 순서 보장). */
export function getUnlockedHints(attemptCount: number): HintLevel[] {
  return HINT_ORDER.filter((level) => attemptCount >= HINT_THRESHOLDS[level]);
}

export interface AwardsHint {
  awards: string[];
}

export interface InitialsHint {
  initials: string;
}

export interface DraftPickHint {
  draftPick: string;
}

/** 서버 액션이 반환하는, 현재 해금된 힌트만 담은 데이터. 해금 안 된 필드는 아예 없음(undefined). */
export interface HintData {
  awards?: AwardsHint;
  initials?: InitialsHint;
  draftPick?: DraftPickHint;
}

export function getInitials(nameEn: string): string {
  const initials = nameEn
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join(".");
  return initials ? `${initials}.` : "";
}

/** "2011 1라운드 5순위" -> "1라운드 5순위" 처럼 연도를 떼어낸다. "언드래프트"처럼 연도가 없는 값은 그대로 둔다. */
export function stripDraftYear(draftPick: string): string {
  return draftPick.replace(/^\d{4}\s*/, "");
}
