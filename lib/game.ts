import playersData from "@/data/players.json";
import type { Player } from "@/lib/types";

const players = playersData as Player[];

/** 문자열을 결정적인(deterministic) 32비트 정수 해시로 변환한다. */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * 주어진 라운드 시드(클라이언트가 새 게임을 시작할 때 생성하는 랜덤 ID)에 대해
 * 항상 같은 선수를 결정적으로 반환한다. 같은 시드로 여러 번 호출해도(제출/힌트/공개 액션이
 * 각각 별도 호출이므로) 같은 정답이 나와야 하기 때문에 시드값 자체를 해시해서 사용한다.
 */
export function getPlayerForSeed(seed: string): Player {
  const hash = hashString(seed);
  const index = hash % players.length;
  return players[index];
}
