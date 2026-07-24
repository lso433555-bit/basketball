import Confetti from "@/components/Confetti";
import { getInitials } from "@/lib/hints";
import type { Player } from "@/lib/types";

interface StatsCardProps {
  player: Player;
  status: "won" | "lost";
  attemptCount: number;
}

export default function StatsCard({ player, status, attemptCount }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-card-border-strong bg-gradient-to-b from-card to-background-elevated p-4 shadow-lg shadow-black/30">
      {status === "won" && <Confetti />}
      <span
        className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${
          status === "won"
            ? "bg-status-correct/20 text-status-correct-border"
            : "bg-card-border/50 text-zinc-400"
        }`}
      >
        {status === "won" ? `🎉 ${attemptCount}번 만에 성공` : "정답 공개"}
      </span>

      <div className="flex flex-col items-center gap-2 pt-1 pb-3">
        <div
          className={`animate-badge-pop flex h-20 w-20 items-center justify-center rounded-full border-2 bg-court-orange-dim ${
            status === "won"
              ? "border-court-orange shadow-[0_0_24px_-4px_rgba(255,107,26,0.6)]"
              : "border-card-border-strong"
          }`}
        >
          <span className="font-display text-2xl text-white">
            {getInitials(player.nameEn)}
          </span>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl tracking-wide text-court-orange-bright">
            {player.name}
          </p>
          <p className="text-xs text-zinc-500">{player.nameEn}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-card-border/70 pt-3 text-sm">
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
