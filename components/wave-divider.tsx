export function WaveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none relative h-12 w-full overflow-hidden text-brand-navy/8 sm:h-16 ${className}`}
      aria-hidden
    >
      <svg
        className={`absolute inset-x-0 h-full w-full ${flip ? "rotate-180" : ""}`}
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
      <div className="bubble-motif absolute inset-0 opacity-60" />
    </div>
  );
}
