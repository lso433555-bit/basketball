import type { HintData, HintLevel } from "@/lib/hints";

interface HintPanelProps {
  hints: HintData;
}

const HINT_ORDER: HintLevel[] = ["awards", "silhouette", "initials"];

const HINT_TITLES: Record<HintLevel, string> = {
  awards: "수상/이력",
  silhouette: "실루엣",
  initials: "이니셜",
};

const HINT_TEASERS: Record<HintLevel, string> = {
  awards: "🔒 4번째 시도 후 해금",
  silhouette: "🔒 6번째 시도 후 해금",
  initials: "🔒 마지막 시도 전 해금",
};

/** 실제 NBA 선수 키 분포(대략 175~229cm) 대비 눈에 띄게 커지도록 비율을 증폭한다. */
function silhouetteScale(heightCm: number): number {
  const raw = 1 + (heightCm - 200) / 100;
  return Math.min(1.4, Math.max(0.6, raw));
}

function PersonSilhouette({ heightCm }: { heightCm: number }) {
  const scale = silhouetteScale(heightCm);
  return (
    <div className="flex h-24 items-end justify-center text-zinc-300">
      <svg
        viewBox="0 0 100 200"
        className="h-20 w-auto"
        style={{ transform: `scaleY(${scale})`, transformOrigin: "bottom" }}
      >
        <g fill="currentColor">
          <circle cx="50" cy="28" r="18" />
          <path d="M30 55 Q50 45 70 55 L78 140 Q65 150 50 150 Q35 150 22 140 Z" />
          <rect x="30" y="145" width="14" height="50" rx="6" />
          <rect x="56" y="145" width="14" height="50" rx="6" />
        </g>
      </svg>
    </div>
  );
}

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
                  {level === "silhouette" && hints.silhouette && (
                    <PersonSilhouette heightCm={hints.silhouette.heightCm} />
                  )}
                  {level === "initials" && hints.initials && (
                    <span className="font-display text-2xl text-white">
                      {hints.initials.initials}
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
