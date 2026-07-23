import type { ComparisonResult } from "@/lib/compare";

export interface Player {
  id: string;
  name: string;
  nameEn: string;
  team: string;
  teamHistory: string[];
  position: string;
  heightCm: number;
  careerFgPct: number;
  careerPts: number;
  awards: string[];
  draftPick: string;
}

export interface Attempt {
  player: Player;
  result: ComparisonResult;
}
