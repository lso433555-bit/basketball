/**
 * 전체 페이지 배경에 깔리는 코트 라인 일러스트(센터서클, 키/페인트존, 자유투 서클, 3점 아크).
 * 아주 낮은 불투명도로 그려서 장식용으로만 쓰이고, 실제 콘텐츠 카드는 전부 불투명 배경이라
 * 이 위에 그대로 덮이므로 텍스트 가독성에는 영향을 주지 않는다.
 */
export default function CourtLines() {
  return (
    <svg
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMin slice"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    >
      <g fill="none" stroke="#ff9142" strokeOpacity="0.09" strokeWidth="2.5">
        {/* 코트 외곽선 */}
        <rect x="20" y="20" width="360" height="760" />
        {/* 센터라인 + 센터서클 */}
        <line x1="20" y1="400" x2="380" y2="400" />
        <circle cx="200" cy="400" r="55" />
        <circle cx="200" cy="400" r="14" />
        {/* 상단 키(페인트존) + 자유투 서클 */}
        <rect x="140" y="20" width="120" height="190" />
        <circle cx="200" cy="210" r="60" />
        {/* 상단 3점 아크 */}
        <path d="M 40 20 L 40 140 A 165 165 0 0 0 360 140 L 360 20" />
        {/* 하단 키(페인트존) + 자유투 서클 */}
        <rect x="140" y="590" width="120" height="190" />
        <circle cx="200" cy="590" r="60" />
        {/* 하단 3점 아크 */}
        <path d="M 40 780 L 40 660 A 165 165 0 0 1 360 660 L 360 780" />
      </g>
    </svg>
  );
}
