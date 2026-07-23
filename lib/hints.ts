export type HintLevel = "awards" | "silhouette" | "initials";

/** 각 힌트가 해금되는 시도 횟수 기준값. */
export const HINT_THRESHOLDS: Record<HintLevel, number> = {
  awards: 4,
  silhouette: 6,
  initials: 7,
};

const HINT_ORDER: HintLevel[] = ["awards", "silhouette", "initials"];

/** 지금까지의 시도 횟수를 기준으로 해금된 힌트 목록을 반환한다 (누적, 순서 보장). */
export function getUnlockedHints(attemptCount: number): HintLevel[] {
  return HINT_ORDER.filter((level) => attemptCount >= HINT_THRESHOLDS[level]);
}

export interface AwardsHint {
  awards: string[];
  draftPick: string;
}

export interface SilhouetteHint {
  heightCm: number;
}

export interface InitialsHint {
  initials: string;
}

/** 서버 액션이 반환하는, 현재 해금된 힌트만 담은 데이터. 해금 안 된 필드는 아예 없음(undefined). */
export interface HintData {
  awards?: AwardsHint;
  silhouette?: SilhouetteHint;
  initials?: InitialsHint;
}

export function getInitials(nameEn: string): string {
  const initials = nameEn
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join(".");
  return initials ? `${initials}.` : "";
}
