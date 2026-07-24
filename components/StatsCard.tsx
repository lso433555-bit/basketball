import type { Player } from "@/lib/types";

interface StatsCardProps {
  player: Player;
}

export default function StatsCard({ player }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-card-border bg-card/70 p-4">
      <div className="mb-3 flex items-baseline justify-between border-b border-card-border/70 pb-2">
        <span className="font-display text-2xl tracking-wide text-court-orange-bright">
          {player.name}
        </span>
        <span className="text-xs text-zinc-500">{player.nameEn}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">팀</span>
          <span className="font-medium">{player.team}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">포지션</span>
          <span className="font-medium">{player.position}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">키</span>
          <span className="font-medium">{player.heightCm}cm</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">통산 야투율</span>
          <span className="font-medium">{player.careerFgPct}%</span>
        </div>
        <div className="col-span-2 flex justify-between">
          <span className="text-zinc-500">통산 득점</span>
          <span className="font-medium">{player.careerPts.toLocaleString()}</span>
        </div>
        <div className="col-span-2 flex justify-between">
          <span className="text-zinc-500">드래프트</span>
          <span className="font-medium">{player.draftPick}</span>
        </div>
      </div>
      {player.awards.length > 0 && (
        <p className="mt-3 text-xs leading-snug text-zinc-400">
          {player.awards.join(", ")}
        </p>
      )}
    </div>
  );
}
