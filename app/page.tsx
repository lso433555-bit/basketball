import GameHeader from "@/components/GameHeader";
import GuessInput from "@/components/GuessInput";
import AttemptSlots from "@/components/AttemptSlots";
import { getTodayPlayer, getTodayDateString } from "@/lib/daily";

export default function Home() {
  const dateStr = getTodayDateString();
  const todayPlayer = getTodayPlayer();

  // STEP 1 완료 기준 확인용 로그 (서버 콘솔에 출력됨)
  console.log(`[농퀴즈] ${dateStr} 정답 선수:`, todayPlayer.nameEn);

  return (
    <div className="flex flex-1 justify-center bg-background">
      <main className="flex w-full max-w-md flex-col gap-6 px-4 pb-16">
        <GameHeader dateStr={dateStr} />
        <GuessInput />
        <AttemptSlots />
      </main>
    </div>
  );
}
