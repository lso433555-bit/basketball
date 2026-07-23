import GameHeader from "@/components/GameHeader";
import GameBoard from "@/components/GameBoard";
import { getTodayDateString, getGameNumber } from "@/lib/daily";

// 매 요청마다 서버에서 새로 렌더링해야 날짜가 바뀔 때 정답도 같이 바뀐다.
// (정적 프리렌더링을 두면 빌드 시점 날짜에 영원히 고정됨)
export const dynamic = "force-dynamic";

export default function Home() {
  const dateStr = getTodayDateString();
  const gameNumber = getGameNumber();

  return (
    <div className="flex flex-1 justify-center bg-background">
      <main className="flex w-full max-w-md flex-col gap-6 px-4 pb-16">
        <GameHeader dateStr={dateStr} />
        <GameBoard gameNumber={gameNumber} />
      </main>
    </div>
  );
}
