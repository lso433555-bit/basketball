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
