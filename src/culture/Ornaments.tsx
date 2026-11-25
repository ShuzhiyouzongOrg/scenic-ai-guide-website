import './ornaments.css'

type OrnamentProps = { className?: string }

export function ChineseLantern({ className = '' }: OrnamentProps) {
  return (
    <svg className={`culture-ornament culture-lantern ${className}`} viewBox="0 0 88 148" aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--culture-gold, #b48b49)" strokeLinecap="round">
        <path d="M44 0v17m-11 9q0-9 11-12 11 3 11 12" strokeWidth="2" />
        <path className="culture-lantern__silk" d="M29 25h30c14 4 22 18 22 35s-8 30-22 35H29C15 90 7 77 7 60s8-31 22-35Z" />
        <g opacity=".75">
          <path d="M30 27c-17 15-17 48 0 66m10-66c-7 16-7 50 0 66m8-66c7 16 7 50 0 66m10-66c17 15 17 48 0 66" />
          <path d="M11 43q33-12 66 0M10 77q34 13 68 0" opacity=".6" />
        </g>
        <path d="M29 25h30m-30 70h30" strokeWidth="5" />
        <path d="M32 21h24m-24 78h24m-12 2v8m-4 1h8" strokeWidth="2" />
        <circle cx="44" cy="113" r="3" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2">
          <path d="M42 117c0 12-4 17-3 23m5-23v27m2-27c0 11 4 17 3 24" />
        </g>
      </g>
    </svg>
  )
}

const knotCord = 'M40 16 62 38Q70 46 64 52Q58 58 50 50L27 27Q22 22 17 27Q12 32 18 38L46 66Q52 72 47 77Q40 84 33 77Q28 72 34 66L62 38Q68 32 63 27Q58 22 53 27L30 50Q22 58 16 52Q10 46 18 38Z'

export function ChineseKnot({ className = '' }: OrnamentProps) {
  return (
    <svg className={`culture-ornament culture-knot ${className}`} viewBox="0 0 80 128" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 16c-8-8-4-13 0-13s8 5 0 13Zm0 8L21 43l19 19 19-19Z" />
        <path d={knotCord} strokeWidth="5" />
        <path d={knotCord} stroke="var(--culture-gold, #b48b49)" strokeWidth="1" />
        <path d="m26 42 7-7m15 19 7-7m-21 9 7-7" strokeWidth="5" />
        <path d="m26 42 7-7m15 19 7-7m-21 9 7-7" stroke="var(--culture-gold, #b48b49)" strokeWidth="1" />
        <path d="M40 80v8m-4 2h8m-7 4c-1 9-5 17-5 25m8-25v30m3-30c1 8 5 17 5 26" stroke="var(--culture-gold, #b48b49)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function LotusOrnament({ className = '' }: OrnamentProps) {
  return (
    <svg className={`culture-ornament culture-lotus ${className}`} viewBox="0 0 96 62" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 46C36 37 37 21 48 7c11 14 12 30 0 39Z" />
        <path d="M48 46C31 46 18 32 17 17c14 1 28 12 31 29Zm0 0c17 0 30-14 31-29-14 1-28 12-31 29Z" />
        <path d="M48 46C30 52 13 44 5 29c13-2 23 1 32 9m11 8c18 6 35-2 43-17-13-2-23 1-32 9" />
        <path d="M34 51q14 5 28 0M48 44V24m-15 14-9-10m39 10 9-10" strokeWidth=".9" />
        <path d="M12 54h15m40 0h15m-45 4h22" opacity=".6" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function LatticeDecoration({ className = '' }: OrnamentProps) {
  return (
    <svg className={`culture-ornament culture-lattice ${className}`} viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter">
        <path d="M0 0h96v96H0ZM8 8h80v80H8Z" />
        <path d="M0 28h16V16h12V0m40 0v16h12v12h16m0 40H80v12H68v16m-40 0V80H16V68H0" />
        <path d="M8 48 48 8l40 40-40 40Zm12 0 28-28 28 28-28 28Z" />
        <path d="M34 34h28v28H34Zm6 6h16v16H40Z" />
        <path d="M0 48h20m56 0h20M48 0v20m0 56v20" />
      </g>
    </svg>
  )
}
