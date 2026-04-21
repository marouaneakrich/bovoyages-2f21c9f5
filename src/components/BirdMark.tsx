/**
 * Inline white bird silhouette with two wing paths that can flap independently.
 * Designed to be very small (~1.5kb) and animatable purely via CSS transforms.
 */
const BirdMark = ({ className = "h-12 w-12" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <path
        d="M50 32 C 56 30, 62 30, 68 32 L 80 34 C 84 35, 84 38, 80 39 L 66 40 C 60 40, 54 38, 50 36 Z"
        fill="currentColor"
      />
      {/* Head + beak */}
      <circle cx="78" cy="34" r="3" fill="currentColor" />
      <path d="M81 34 L 88 33 L 81 35 Z" fill="currentColor" />
      {/* Left wing — flaps up */}
      <path
        className="bird-wing bird-wing-l"
        d="M40 32 Q 30 16, 16 22 Q 28 28, 36 34 Z"
        fill="currentColor"
        style={{ transformOrigin: "40px 32px" }}
      />
      {/* Right wing — flaps down (mirror) */}
      <path
        className="bird-wing bird-wing-r"
        d="M55 32 Q 50 22, 38 24 Q 48 30, 54 34 Z"
        fill="currentColor"
        style={{ transformOrigin: "55px 32px" }}
      />
    </svg>
  );
};

export default BirdMark;
