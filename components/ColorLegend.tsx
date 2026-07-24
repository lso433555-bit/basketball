const LEGEND_ITEMS = [
  { key: "correct", label: "정확", swatch: "bg-status-correct border-status-correct-border" },
  { key: "close", label: "근접", swatch: "bg-status-close border-status-close-border" },
  { key: "wrong", label: "불일치", swatch: "bg-status-wrong border-status-wrong-border" },
] as const;

/** 정확/근접/불일치 색상과 방향 화살표가 무엇을 뜻하는지 항상 보이는 곳에 설명한다. */
export default function ColorLegend() {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-card-border/70 bg-card/50 px-3 py-2.5">
      <div className="flex items-center justify-center gap-3">
        <span className="font-display text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
          Key
        </span>
        <span className="h-3 w-px bg-card-border-strong" aria-hidden="true" />
        {LEGEND_ITEMS.map((item) => (
          <div key={item.key} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={`h-3 w-3 rounded-[3px] border ${item.swatch}`}
            />
            <span className="text-xs font-medium text-zinc-300">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-[11px] text-zinc-500">
        ⬆️ 정답이 더 큼 · ⬇️ 정답이 더 작음
      </p>
    </div>
  );
}
