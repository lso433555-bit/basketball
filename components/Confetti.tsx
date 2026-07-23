"use client";

const CONFETTI_COLORS = ["#ff6b1a", "#facc15", "#34d399", "#60a5fa", "#f472b6"];
const PIECE_COUNT = 24;

// 컴포넌트 렌더와 무관하게 모듈 로드 시점에 한 번만 계산한다 (렌더 중 impure 호출 금지 규칙 회피).
const CONFETTI_PIECES = Array.from({ length: PIECE_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 0.4,
  duration: 1.6 + Math.random() * 1.2,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  rotate: Math.random() * 360,
}));

export default function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {CONFETTI_PIECES.map((p) => (
        <span
          key={p.id}
          className="animate-confetti-fall absolute top-[-10%] h-2 w-2 rounded-sm"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
