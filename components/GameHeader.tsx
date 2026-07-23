interface GameHeaderProps {
  dateStr: string;
}

export default function GameHeader({ dateStr }: GameHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-1 pt-10 pb-6 text-center">
      <h1 className="font-display text-5xl tracking-wide text-court-orange sm:text-6xl">
        농퀴즈 🏀
      </h1>
      <p className="text-sm text-zinc-400">오늘의 선수 · {dateStr}</p>
    </header>
  );
}
