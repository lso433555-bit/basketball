import type { Attempt } from "@/lib/types";
import type { StatResult, Status, Direction } from "@/lib/compare";
import { getDraftYear } from "@/lib/playerDisplay";

interface AttemptSlotsProps {
  attempts: Attempt[];
  totalSlots: number;
}

const statusClasses: Record<Status, string> = {
  correct: "bg-status-correct border-status-correct-border/70 text-white",
  close: "bg-status-close border-status-close-border/70 text-zinc-900",
  wrong: "bg-status-wrong border-status-wrong-border/50 text-rose-50",
};

const directionArrow: Record<Direction, string> = {
  up: "▲",
  down: "▼",
};

function StatCell({
  label,
  value,
  result,
  index,
}: {
  label: string;
  value: string;
  result: StatResult;
  index: number;
}) {
  return (
    <div
      style={{ animationDelay: `${index * 60}ms` }}
      className={`animate-cell-in flex flex-col items-center justify-center gap-0.5 rounded-xl border px-1 py-2 text-center shadow-sm shadow-black/10 ${statusClasses[result.status]}`}
    >
      <span className="text-[9px] font-medium tracking-wide uppercase opacity-75">{label}</span>
      <span className="flex items-center gap-1 text-xs leading-tight font-bold tabular-nums">
        {value}
        {result.direction && (
          <span className="text-sm leading-none font-black" aria-hidden="true">
            {directionArrow[result.direction]}
          </span>
        )}
      </span>
    </div>
  );
}

export default function AttemptSlots({ attempts, totalSlots }: AttemptSlotsProps) {
  const emptySlots = totalSlots - attempts.length;

  return (
    <ol className="flex w-full flex-col gap-2">
      {attempts.map((attempt, i) => (
        <li
          key={attempt.player.id}
          className="flex flex-col gap-1.5 rounded-2xl border border-l-4 border-card-border border-l-court-orange/70 bg-gradient-to-b from-card to-background-elevated/60 px-3 py-2.5 shadow-sm shadow-black/20"
        >
          <div className="flex items-center gap-2 text-sm text-foreground">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-court-orange-bright/40 bg-court-orange-dim font-display text-sm text-court-orange-bright">
              {i + 1}
            </span>
            <span className="font-semibold">{attempt.player.name}</span>
          </div>

          {/* 1줄: TM/POS/HT/FG%/DFT (신상 정보 5개) */}
          <div className="grid grid-cols-5 gap-1.5">
            <StatCell label="TM" value={attempt.player.team} result={attempt.result.team} index={0} />
            <StatCell
              label="POS"
              value={attempt.player.position}
              result={attempt.result.position}
              index={1}
            />
            <StatCell
              label="HT"
              value={`${attempt.player.heightCm}cm`}
              result={attempt.result.height}
              index={2}
            />
            <StatCell
              label="FG%"
              value={`${attempt.player.careerFgPct}%`}
              result={attempt.result.careerFgPct}
              index={3}
            />
            <StatCell
              label="DFT"
              value={
                getDraftYear(attempt.player.draftPick) !== null
                  ? `${getDraftYear(attempt.player.draftPick)}`
                  : "UD"
              }
              result={attempt.result.draftYear}
              index={4}
            />
          </div>

          {/* 2줄: PTS/REB/AST (박스스코어 3대 스탯) */}
          <div className="grid grid-cols-3 gap-1.5">
            <StatCell
              label="PTS"
              value={attempt.player.careerPts.toLocaleString()}
              result={attempt.result.careerPts}
              index={5}
            />
            <StatCell
              label="REB"
              value={attempt.player.careerRebounds.toLocaleString()}
              result={attempt.result.careerRebounds}
              index={6}
            />
            <StatCell
              label="AST"
              value={attempt.player.careerAssists.toLocaleString()}
              result={attempt.result.careerAssists}
              index={7}
            />
          </div>
        </li>
      ))}

      {Array.from({ length: emptySlots }, (_, i) => (
        <li
          key={`empty-${i}`}
          className="flex h-11 items-center gap-2 rounded-2xl border border-dashed border-card-border/60 px-3 text-sm text-zinc-600"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-card-border/60 font-display text-sm text-zinc-600">
            {attempts.length + i + 1}
          </span>
        </li>
      ))}
    </ol>
  );
}
