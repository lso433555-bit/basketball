const TOTAL_ATTEMPTS = 8;

export default function AttemptSlots() {
  return (
    <ol className="flex w-full flex-col gap-2">
      {Array.from({ length: TOTAL_ATTEMPTS }, (_, i) => (
        <li
          key={i}
          className="flex h-12 items-center rounded-xl border border-card-border bg-card px-4 text-sm text-zinc-500"
        >
          <span className="w-6 font-display text-lg text-zinc-600">
            {i + 1}
          </span>
        </li>
      ))}
    </ol>
  );
}
