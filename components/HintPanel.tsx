import type { HintData, HintLevel } from "@/lib/hints";

interface HintPanelProps {
  hints: HintData;
}

const HINT_ORDER: HintLevel[] = ["awards", "initials", "draftPick"];

const HINT_TITLES: Record<HintLevel, string> = {
  awards: "수상/이력",
  initials: "이니셜",
  draftPick: "드래프트 순번",
};

const HINT_TEASERS: Record<HintLevel, string> = {
  awards: "🔒 4번째 시도 후 해금",
  initials: "🔒 6번째 시도 후 해금",
  draftPick: "🔒 마지막 시도 전 해금",
};

export default function HintPanel({ hints }: HintPanelProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-lg tracking-[0.15em] text-zinc-400 uppercase">힌트</h2>
      <div className="grid grid-cols-3 gap-2">
        {HINT_ORDER.map((level) => {
          const isUnlocked = hints[level] !== undefined;
          return (
            <div
              key={level}
              className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-center transition-all ${
                isUnlocked
                  ? "animate-hint-in border-court-orange/70 bg-gradient-to-b from-card to-court-orange-dim/20 shadow-[0_0_14px_-4px_rgba(255,107,26,0.45)]"
                  : "border-card-border/60 bg-card/40 text-zinc-600"
              }`}
            >
              {isUnlocked ? (
                <>
                  <span className="text-xs font-semibold text-court-orange-bright">
                    {HINT_TITLES[level]}
                  </span>
                  {level === "awards" && hints.awards && (
                    <p className="text-xs leading-snug text-zinc-300">
                      {hints.awards.awards.length > 0
                        ? hints.awards.awards.join(", ")
                        : "특별한 수상 이력 없음"}
                    </p>
                  )}
                  {level === "initials" && hints.initials && (
                    <span className="font-display text-2xl text-white">
                      {hints.initials.initials}
                    </span>
                  )}
                  {level === "draftPick" && hints.draftPick && (
                    <span className="text-xs font-medium text-zinc-300">
                      {hints.draftPick.draftPick}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-lg opacity-50" aria-hidden="true">
                    🔒
                  </span>
                  <span className="text-[10px] leading-snug">{HINT_TEASERS[level]}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
