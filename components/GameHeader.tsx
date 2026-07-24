export default function GameHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-card-border-strong bg-gradient-to-b from-background-elevated to-background px-4 pt-6 pb-4 text-center shadow-lg shadow-black/40">
      <div className="court-watermark" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-red-500" />
          </span>
          <span className="text-[10px] font-bold tracking-[0.3em] text-red-400 uppercase">
            Live
          </span>
        </div>

        <h1 className="font-display text-6xl tracking-wide text-foreground sm:text-7xl">
          농<span className="text-court-orange">퀴즈</span>{" "}
          <span aria-hidden="true">🏀</span>
        </h1>
        <p className="text-xs text-zinc-400">NBA 선수 맞추기</p>
        <div className="court-divider mt-1 w-32 max-w-[40%]" />
      </div>
    </header>
  );
}
