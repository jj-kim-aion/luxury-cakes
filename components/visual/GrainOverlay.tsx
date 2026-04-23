/**
 * GrainOverlay — DESIGN.md §8.4
 * Subtle SVG noise, fixed full-viewport, mix-blend overlay at 0.04 opacity.
 * Static (no animation) for performance. Single import in layout.tsx.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
