import playersData from "@/data/players.json";
import type { Player } from "@/lib/types";

const players = playersData as Player[];

const MAX_SUGGESTIONS = 8;

/**
 * 정적 players.json 안에서만 로컬로 검색한다 (런타임 API 호출 없음).
 * 한글 이름/영문 이름 양쪽에 대해 대소문자 무시 부분 일치로 필터링한다.
 */
export function searchPlayers(query: string, limit: number = MAX_SUGGESTIONS): Player[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return players
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q)
    )
    .slice(0, limit);
}

/** 입력값이 목록에 있는 선수 이름과 정확히 일치하는지 확인하고, 일치하면 해당 선수를 반환한다. */
export function findExactPlayer(query: string): Player | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    players.find(
      (p) => p.name.toLowerCase() === q || p.nameEn.toLowerCase() === q
    ) ?? null
  );
}
