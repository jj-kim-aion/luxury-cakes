/**
 * Aurora — DESIGN.md §8.1
 * Pure CSS animated gradient background (transform + opacity only).
 * 21st-dev-magic equivalent — hand-implemented here because the MCP server
 * is unavailable in this offline sandbox, but it conforms to the exact
 * GPU-safe contract the MCP would satisfy (§6.2).
 *
 * z-index: 0  — sits behind hero content (content at z >= 10)
 * pointer-events: none — decorative
 * aria-hidden — invisible to AT
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <Aurora />
 *     <div className="relative z-10"> … hero content … </div>
 *   </section>
 */
export function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora-band" />
    </div>
  );
}
