import Confetti from "@/components/Confetti";
import { getInitials } from "@/lib/hints";
import { getChampionshipCount, getEra, getFlagEmoji } from "@/lib/playerDisplay";
import type { Player } from "@/lib/types";

interface StatsCardProps {
  player: Player;
  status: "won" | "lost";
  attemptCount: number;
}

function BoxStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-lg bg-background/40 px-1 py-2">
      <span className="text-[9px] font-medium tracking-wide text-zinc-500 uppercase">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground tabular-nums">{value}</span>
    </div>
  );
}

export default function StatsCard({ player, status }: StatsCardProps) {
  const championships = getChampionshipCount(player.awards);
  const era = getEra(player.draftPick);
  const flag = getFlagEmoji(player.nationality);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-card-border-strong bg-gradient-to-b from-card to-background-elevated p-4 shadow-lg shadow-black/30">
      {status === "won" && <Confetti />}

      {/* 아바타 + 국기 + 이름 */}
      <div className="flex flex-col items-center gap-1 pb-3">
        <div
          className={`animate-badge-pop mb-1 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-court-orange-dim ${
            status === "won"
              ? "border-court-orange shadow-[0_0_24px_-4px_rgba(255,107,26,0.6)]"
              : "border-card-border-strong"
          }`}
        >
          <span className="font-display text-2xl text-white">
            {getInitials(player.nameEn)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span aria-hidden="true">{flag}</span>
          <p className="font-display text-2xl tracking-wide text-court-orange-bright">
            {player.name}
          </p>
        </div>
        <p className="text-xs text-zinc-500">{player.nameEn}</p>
      </div>

      {/* 박스스코어 */}
      <div className="grid grid-cols-3 gap-1.5 border-t border-card-border/70 pt-3 pb-3">
        <BoxStat label="포지션" value={player.position} />
        <BoxStat label="키" value={`${player.heightCm}cm`} />
        <BoxStat label="야투율" value={`${player.careerFgPct}%`} />
        <BoxStat label="득점" value={player.careerPts.toLocaleString()} />
        <BoxStat label="리바운드" value={player.careerRebounds.toLocaleString()} />
        <BoxStat label="어시스트" value={player.careerAssists.toLocaleString()} />
      </div>

      {/* 팀 · 연대 */}
      <div className="flex items-center justify-center gap-2 border-t border-card-border/70 pt-3 text-sm text-zinc-300">
        <span className="font-semibold">{player.team}</span>
        <span className="text-zinc-600" aria-hidden="true">
          ·
        </span>
        <span>{era}</span>
      </div>

      {/* 우승 + 수상이력 */}
      {(championships > 0 || player.awards.length > 0) && (
        <div className="mt-3 flex flex-col items-center gap-1 border-t border-card-border/70 pt-3">
          {championships > 0 && (
            <span className="text-sm font-bold text-court-orange-bright">
              🏆 우승 {championships}회
            </span>
          )}
          {player.awards.length > 0 && (
            <p className="text-center text-xs leading-snug text-zinc-400">
              {player.awards.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
