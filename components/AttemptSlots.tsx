import type { Attempt } from "@/components/GameBoard";
import type { StatResult, Status, Direction } from "@/lib/compare";

interface AttemptSlotsProps {
  attempts: Attempt[];
  totalSlots: number;
}

const statusClasses: Record<Status, string> = {
  correct: "bg-emerald-600 border-emerald-500 text-white",
  close: "bg-amber-500 border-amber-400 text-black",
  wrong: "bg-red-600/80 border-red-500 text-white",
};

const directionArrow: Record<Direction, string> = {
  up: "⬆️",
  down: "⬇️",
};

function StatCell({
  label,
  value,
  result,
}: {
  label: string;
  value: string;
  result: StatResult;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border px-1 py-1.5 text-center ${statusClasses[result.status]}`}
    >
      <span className="text-[10px] opacity-80">{label}</span>
      <span className="text-xs font-semibold">
        {value}
        {result.direction ? ` ${directionArrow[result.direction]}` : ""}
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
          className="flex flex-col gap-1.5 rounded-xl border border-card-border bg-card px-3 py-2"
        >
          <div className="flex items-center gap-2 text-sm text-foreground">
            <span className="font-display text-lg text-zinc-500">{i + 1}</span>
            <span className="font-medium">{attempt.player.name}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            <StatCell label="팀" value={attempt.player.team} result={attempt.result.team} />
            <StatCell
              label="포지션"
              value={attempt.player.position}
              result={attempt.result.position}
            />
            <StatCell
              label="키"
              value={`${attempt.player.heightCm}cm`}
              result={attempt.result.height}
            />
            <StatCell
              label="야투율"
              value={`${attempt.player.careerFgPct}%`}
              result={attempt.result.careerFgPct}
            />
            <StatCell
              label="득점"
              value={attempt.player.careerPts.toLocaleString()}
              result={attempt.result.careerPts}
            />
          </div>
        </li>
      ))}

      {Array.from({ length: emptySlots }, (_, i) => (
        <li
          key={`empty-${i}`}
          className="flex h-12 items-center rounded-xl border border-card-border bg-card px-4 text-sm text-zinc-500"
        >
          <span className="w-6 font-display text-lg text-zinc-600">
            {attempts.length + i + 1}
          </span>
        </li>
      ))}
    </ol>
  );
}
