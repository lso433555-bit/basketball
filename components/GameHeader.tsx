export default function GameHeader() {
  return (
    <header className="flex flex-col items-center gap-2 pt-8 pb-2 text-center">
      <span className="rounded-full border border-court-orange/40 bg-court-orange-dim/50 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-court-orange-bright uppercase">
        Daily Challenge
      </span>
      <h1 className="font-display text-6xl tracking-wide text-foreground sm:text-7xl">
        농<span className="text-court-orange">퀴즈</span> <span aria-hidden="true">🏀</span>
      </h1>
      <p className="text-xs text-zinc-500">오늘의 NBA 선수를 맞혀보세요</p>
      <div className="court-divider mt-1 w-32 max-w-[40%]" />
    </header>
  );
}
