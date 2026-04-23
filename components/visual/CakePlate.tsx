/**
 * CakePlate — CSS-painted abstract cake silhouette.
 *
 * Replaces emoji imagery (hard-rejected by DESIGN.md §11 / §9.2).
 * Each plate composes layered gradient "tiers" + gold topper + warm backdrop.
 * The `accent` hex token drives the composition via color-mix() in tokens.css.
 *
 * Accepts any hex (e.g. product.imageAccent) via `--plate-accent` CSS variable.
 * Purely decorative — always aria-hidden.
 */
type Props = {
  accent?: string;
  tiers?: 1 | 2 | 3;
  variant?: 'default' | 'seal' | 'tiered' | 'flat';
  morph?: boolean;
  className?: string;
};

export function CakePlate({
  accent,
  tiers = 2,
  variant = 'default',
  morph = false,
  className = '',
}: Props) {
  const style = accent ? ({ ['--plate-accent' as string]: accent } as React.CSSProperties) : undefined;

  return (
    <div
      className={`cake-plate ${morph ? 'blob-mask' : ''} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="cake-plate-bg" />
      <div className="cake-silhouette">
        {/* Base plate ring */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: '4%',
            width: '102%',
            height: '6%',
            background:
              'linear-gradient(180deg, rgba(26,20,19,0.14) 0%, rgba(26,20,19,0.03) 100%)',
            borderRadius: '50% / 100%',
            filter: 'blur(2px)',
          }}
        />
        {tiers >= 1 && <div className="cake-tier cake-tier-1" />}
        {tiers >= 2 && <div className="cake-tier cake-tier-2" />}
        {tiers >= 3 && <div className="cake-tier cake-tier-3" />}
        {variant === 'seal' ? null : <div className="cake-topper" />}

        {/* Vertical drip lines */}
        {tiers >= 2 && (
          <>
            <span
              aria-hidden="true"
              className="absolute"
              style={{
                left: '18%',
                bottom: '40%',
                width: '3px',
                height: '10%',
                background:
                  'linear-gradient(180deg, rgba(255,253,250,0.55) 0%, transparent 100%)',
                borderRadius: '2px',
                filter: 'blur(0.5px)',
              }}
            />
            <span
              aria-hidden="true"
              className="absolute"
              style={{
                right: '22%',
                bottom: '42%',
                width: '3px',
                height: '8%',
                background:
                  'linear-gradient(180deg, rgba(255,253,250,0.35) 0%, transparent 100%)',
                borderRadius: '2px',
                filter: 'blur(0.5px)',
              }}
            />
          </>
        )}
      </div>

      {/* Foreground gold shimmer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 30% 20% at 50% 50%, rgba(201,169,106,0.18) 0%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
