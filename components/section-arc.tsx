interface Props {
  fill: string;
  height?: number;
  /**
   * invert=false (default): arc bows UP from the bottom — fills the dome shape.
   * invert=true: fills the corners, leaving a circular dome cutout.
   */
  invert?: boolean;
  /**
   * For invert=true only. Where the dome peak sits, 0–1 across the viewport.
   * 0.5 = centred (default). 0.3 = peak shifted left. 0.7 = peak shifted right.
   * Uses an SVG even-odd circle punch-out — true circle geometry, no distortion.
   */
  peak?: number;
  /** Override the computed circle radius. Larger = flatter/wider dome. */
  radius?: number;
}

/**
 * A true circular arc transition at the bottom of a section.
 * The containing section must have `position: relative` and `overflow-hidden`.
 *
 * Height is expressed at a 1440px reference viewport and scales proportionally
 * with vw so the circle geometry is preserved at all widths.
 */
export default function SectionArc({ fill, height = 200, invert = false, peak = 0.5, radius }: Props) {
  const W = 1000;
  // SVG coordinate height scaled to 1440px reference — ensures x/y scale stay equal
  // so the circle stays a circle at every viewport width.
  const H = (W * height) / 1440;

  let d: string;

  if (invert) {
    const cx = peak * W;
    // Radius so the dome bottom just reaches y=H at x=cx (or use override)
    const R = radius ?? ((W / 2) ** 2 + H ** 2) / (2 * H);
    const cy = H - R; // circle centre above the container

    // Full-width rectangle filled with `fill`, circle punched out via even-odd rule.
    // The circle path draws the full circle; even-odd makes it a hole in the rectangle.
    const circle = `M${cx},${cy - R} a${R},${R} 0,1,0,0,${2 * R} a${R},${R} 0,1,0,0,${-2 * R}`;
    d = `M0,0 H${W} V${H} H0 Z ${circle}`;

  } else {
    // Arch up from the bottom — same circle, just filled instead of punched out.
    // cy=R positions the circle so its top is at y=0 at x=cx, filling the dome from below.
    const cx = peak * W;
    const R = radius ?? ((W / 2) ** 2 + H ** 2) / (2 * H);
    d = `M${cx},0 a${R},${R} 0,1,0,0,${2 * R} a${R},${R} 0,1,0,0,${-2 * R}`;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      style={{ height: `calc(${(height / 1440) * 100}vw + 2px)`, bottom: '-1px', zIndex: 1 }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        <path d={d} fill={fill} fillRule={invert ? 'evenodd' : undefined} />
      </svg>
    </div>
  );
}
