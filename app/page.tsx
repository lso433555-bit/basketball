import GameHeader from "@/components/GameHeader";
import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center">
      <main className="flex w-full max-w-md flex-col gap-6 px-4 pb-16">
        <GameHeader />
        <GameBoard />
      </main>
    </div>
  );
}
