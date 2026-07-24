"use client";

import { useState } from "react";

interface ShareButtonProps {
  text: string;
}

export default function ShareButton({ text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 API를 쓸 수 없는 환경(권한 거부 등) — 조용히 무시, 버튼만 원래 상태 유지
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-2xl bg-gradient-to-b from-court-orange-bright to-court-orange px-4 py-3 font-semibold text-white shadow-md shadow-court-orange/20 transition-all hover:brightness-110 active:scale-[0.98] active:brightness-95"
    >
      {copied ? "복사됨! ✅" : "결과 복사하기"}
    </button>
  );
}
