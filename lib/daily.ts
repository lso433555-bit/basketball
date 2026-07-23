import playersData from "@/data/players.json";
import type { Player } from "@/lib/types";

const players = playersData as Player[];

/** YYYY-MM-DD 형태의 KST(한국 표준시) 날짜 문자열을 반환한다. */
export function getKstDateString(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;

  return `${y}-${m}-${d}`;
}

/** 문자열을 결정적인(deterministic) 32비트 정수 해시로 변환한다. */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** 주어진 날짜(KST 기준)에 대해 항상 같은 선수를 결정적으로 반환한다. */
export function getPlayerForDate(date: Date = new Date()): Player {
  const dateStr = getKstDateString(date);
  const hash = hashString(dateStr);
  const index = hash % players.length;
  return players[index];
}

/** 오늘(KST 기준)의 정답 선수를 반환한다. */
export function getTodayPlayer(): Player {
  return getPlayerForDate(new Date());
}

/** 오늘(KST 기준) 날짜 문자열을 반환한다. */
export function getTodayDateString(): string {
  return getKstDateString(new Date());
}

/** 게임이 시작된 날(2026-07-23)을 1일차로 하는 일수 기반 게임 번호. 정답과 무관한 공개 정보라 클라이언트에 그대로 내려도 안전하다. */
const EPOCH_DATE_STR = "2026-07-23";

export function getGameNumber(): number {
  const epoch = new Date(`${EPOCH_DATE_STR}T00:00:00+09:00`);
  const today = new Date(`${getTodayDateString()}T00:00:00+09:00`);
  const diffDays = Math.round((today.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}
