/** awards 배열에서 "N회 우승" 패턴을 찾아 우승 횟수를 뽑아낸다 (새 데이터 없이 기존 필드에서 유도). */
export function getChampionshipCount(awards: string[]): number {
  for (const award of awards) {
    const match = award.match(/(\d+)회\s*우승/);
    if (match) return parseInt(match[1], 10);
  }
  return 0;
}

/** draftPick 문자열 맨 앞의 연도를 뽑아낸다. "언드래프트"처럼 연도가 없으면 null. */
export function getDraftYear(draftPick: string): number | null {
  const match = draftPick.match(/^(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

/** draftPick의 연도를 기준으로 대략적인 활동 연대를 유추한다 (새 데이터 없이 기존 필드에서 유도). */
export function getEra(draftPick: string): string {
  const match = draftPick.match(/(\d{4})/);
  if (!match) return "미상";
  const year = parseInt(match[1], 10);
  if (year < 1980) return "1970년대";
  if (year < 1990) return "1980년대";
  if (year < 2000) return "1990년대";
  if (year < 2010) return "2000년대";
  if (year < 2020) return "2010년대";
  return "2020년대~";
}

const NATIONALITY_FLAGS: Record<string, string> = {
  미국: "🇺🇸",
  세르비아: "🇷🇸",
  리투아니아: "🇱🇹",
  슬로베니아: "🇸🇮",
  그리스: "🇬🇷",
  프랑스: "🇫🇷",
  스페인: "🇪🇸",
  독일: "🇩🇪",
  캐나다: "🇨🇦",
  호주: "🇦🇺",
  아르헨티나: "🇦🇷",
  브라질: "🇧🇷",
  카메룬: "🇨🇲",
  나이지리아: "🇳🇬",
  세네갈: "🇸🇳",
  콩고민주공화국: "🇨🇩",
  크로아티아: "🇭🇷",
  몬테네그로: "🇲🇪",
  터키: "🇹🇷",
  라트비아: "🇱🇻",
  자메이카: "🇯🇲",
  "도미니카 공화국": "🇩🇴",
  이집트: "🇪🇬",
  레바논: "🇱🇧",
  뉴질랜드: "🇳🇿",
  중국: "🇨🇳",
  이탈리아: "🇮🇹",
  헝가리: "🇭🇺",
};

/** 국가 이름에 해당하는 국기 이모지를 반환한다. 매핑에 없으면 지구본 이모지로 대체한다. */
export function getFlagEmoji(nationality: string): string {
  return NATIONALITY_FLAGS[nationality] ?? "🌍";
}
