"use client";

import { useState } from "react";
import { searchPlayers, findExactPlayer } from "@/lib/search";
import type { Player } from "@/lib/types";

export default function GuessInput() {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = showSuggestions ? searchPlayers(value) : [];
  const selectedPlayer: Player | null = findExactPlayer(value);

  const selectPlayer = (player: Player) => {
    setValue(player.name);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <form
        className="flex w-full gap-2"
        onSubmit={(e) => {
          // TODO(STEP 2): 정답 제출 및 채점 로직 연결
          e.preventDefault();
        }}
      >
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
          className="flex-1 rounded-xl border border-card-border bg-card px-4 py-3 text-base text-foreground placeholder:text-zinc-500 outline-none focus:border-court-orange"
        />
        <button
          type="submit"
          disabled={!selectedPlayer}
          className="rounded-xl bg-court-orange px-5 py-3 font-semibold text-white transition-colors hover:bg-orange-600 active:bg-orange-700 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
        >
          제출
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-card-border bg-card shadow-lg">
          {suggestions.map((player) => (
            <li key={player.id}>
              <button
                type="button"
                // onMouseDown to fire before the input's onBlur
                onMouseDown={() => selectPlayer(player)}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-foreground hover:bg-court-orange-dim"
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
