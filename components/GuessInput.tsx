"use client";

import { useState } from "react";
import { searchPlayers, findExactPlayer } from "@/lib/search";
import type { Player } from "@/lib/types";

interface GuessInputProps {
  onSubmit: (player: Player) => void;
  disabled: boolean;
  guessedIds: Set<string>;
}

export default function GuessInput({ onSubmit, disabled, guessedIds }: GuessInputProps) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = showSuggestions ? searchPlayers(value) : [];
  const selectedPlayer: Player | null = findExactPlayer(value);
  const alreadyGuessed = selectedPlayer ? guessedIds.has(selectedPlayer.id) : false;
  const canSubmit = !disabled && selectedPlayer !== null && !alreadyGuessed;

  const selectPlayer = (player: Player) => {
    setValue(player.name);
    setShowSuggestions(false);
  };

  const submitGuess = () => {
    if (!canSubmit || !selectedPlayer) return;
    onSubmit(selectedPlayer);
    setValue("");
  };

  return (
    <div className="relative w-full">
      <form
        className="flex w-full gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitGuess();
        }}
      >
        <div className="relative flex-1">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500"
          >
            <circle cx="9" cy="9" r="6.5" />
            <path d="M14 14 L18 18" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // 클릭으로 선택할 시간을 주기 위해 살짝 지연 후 닫기
              setTimeout(() => setShowSuggestions(false), 100);
            }}
            placeholder="선수 이름을 입력하세요 (예: 르브론 제임스)"
            autoComplete="off"
            disabled={disabled}
            className="w-full rounded-2xl border border-card-border bg-card py-3 pr-4 pl-10 text-base text-foreground shadow-inner shadow-black/20 outline-none transition-colors placeholder:text-zinc-500 focus:border-court-orange focus:ring-2 focus:ring-court-orange/30 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-2xl bg-gradient-to-b from-court-orange-bright to-court-orange px-5 py-3 font-semibold text-white shadow-md shadow-court-orange/20 transition-all hover:brightness-110 active:scale-95 active:brightness-95 disabled:cursor-not-allowed disabled:bg-none disabled:bg-zinc-700 disabled:text-zinc-500 disabled:shadow-none"
        >
          제출
        </button>
      </form>

      {alreadyGuessed && (
        <p className="mt-1 text-xs text-status-wrong-border">이미 제출한 선수예요.</p>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-2xl border border-card-border bg-card shadow-lg shadow-black/40">
          {suggestions.map((player) => (
            <li key={player.id}>
              <button
                type="button"
                // onMouseDown to fire before the input's onBlur
                onMouseDown={() => selectPlayer(player)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-court-orange-dim/60"
              >
                <span>{player.name}</span>
                <span className="text-xs text-zinc-500">{player.team}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
