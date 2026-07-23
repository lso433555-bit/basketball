import GameHeader from "@/components/GameHeader";
import GameBoard from "@/components/GameBoard";
import { getTodayPlayer, getTodayDateString } from "@/lib/daily";

// 매 요청마다 서버에서 새로 렌더링해야 날짜가 바뀔 때 정답도 같이 바뀐다.
// (정적 프리렌더링을 두면 빌드 시점 날짜에 영원히 고정됨)
export const dynamic = "force-dynamic";

export default function Home() {
  const dateStr = getTodayDateString();
  const todayPlayer = getTodayPlayer();

  // STEP 1 완료 기준 확인용 로그 (서버 콘솔에만 출력됨 — 클라이언트로 전달되지 않음)
  console.log(`[농퀴즈] ${dateStr} 정답 선수:`, todayPlayer.nameEn);

  return (
    <div className="flex flex-1 justify-center bg-background">
      <main className="flex w-full max-w-md flex-col gap-6 px-4 pb-16">
        <GameHeader dateStr={dateStr} />
        <GameBoard />
      </main>
    </div>
  );
}
