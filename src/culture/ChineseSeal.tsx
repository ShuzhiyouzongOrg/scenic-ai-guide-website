import type { SealId } from './passportContext'

const engravings = {
  mountain: <>
    <path d="M12 65 10 17 19 10 63 9 70 17 69 61 63 69 20 70Z" strokeWidth="3.2" />
    <path d="m15 58 14-23 7 9 12-24 18 38M20 60l11-15 5 7 12-22 6 12-5-3-9 17m9-8 9 12M16 63h46" />
    <circle cx="27" cy="24" r="4.5" />
    <path d="m14 19 2-3 7-1m34 51 5-1 4-5" strokeWidth="1.1" />
  </>,
  water: <>
    <path d="M68 31c5 14-1 29-13 36-13 8-31 4-40-9C6 45 9 28 19 18 30 7 49 7 60 17c4 3 6 7 8 11" strokeWidth="3.4" />
    <path d="M17 40c6-3 8-11 14-11 9 0 5 13 14 13 7 0 9-12 17-10M15 48c9 2 14-11 19-10 6 0 6 13 15 12 6-1 10-7 16-8M20 56c8 1 13-10 19-9 6 2 6 11 14 10 4 0 6-3 10-5M29 62c4 0 9-7 13-6 4 1 6 6 10 6" />
    <path d="M19 32c4-11 13-15 22-16m6 0 5 2" strokeWidth="1.2" />
  </>,
  lotus: <>
    <path d="M19 12c9 3 14-1 21-5 8 5 14 8 22 5l6 7c-4 8-1 15 5 21-5 7-8 14-5 22l-7 6c-8-3-15 0-21 5-6-5-14-8-22-5l-6-7c3-9 0-15-5-21 5-6 8-12 5-21Z" strokeWidth="3" />
    <path d="M40 54c-11-9-13-19 0-34 12 13 12 24 0 34ZM39 53c-15 0-22-8-22-19 10 0 18 6 22 19Zm2 0c14 0 21-8 22-19-10 0-19 6-22 19ZM22 57c7 5 15 4 18 0 5 4 12 4 18 0M40 44V30" />
    <path d="m24 18 4 1m25 45 4-1" strokeWidth="1.1" />
  </>,
  maple: <>
    <path d="m12 19 7-8 42-1 8 9 1 42-9 9-43-1-8-9Z" strokeWidth="3.2" />
    <path d="m40 18 6 12 5-4-1 13 9-5-1 7 6 1-10 10 2 4-14-1-3 9-3-2 3-9-13 1 2-4-10-11 7 1-1-8 10 7-2-14 5 4Z" />
    <path d="m40 54 1-23m-2 20-9-9m11 10 10-9M17 23v-4l4-3m37 49 7-7" strokeWidth="1.4" />
  </>,
  cloud: <>
    <path d="M12 59V21q0-7 8-7h39q8 0 9 8v37q0 7-8 7H21q-9 0-9-7Z" strokeWidth="3.2" />
    <path d="M18 46h18c8 0 10-11 3-13-7-3-13 5-8 9m-10-5c3-9 11-10 14-8 0-9 10-14 17-9 6 4 4 10-1 11-4 1-6-2-5-5M44 42c6-1 6-8 12-8 9-1 10 12 0 13h-8c-7 0-5 10-15 10H20m29-5h10m-33 0h5" />
    <path d="M16 28v-5q0-5 6-5m35 44h4l3-4" strokeWidth="1.1" />
  </>,
  visit: <>
    <path d="m12 11 53-1 4 5-1 51-5 3-51-2-2-4Z" strokeWidth="3.7" />
    <text x="40" y="56" fill="currentColor" stroke="none" textAnchor="middle" fontSize="47"
      fontFamily="'STKaiti', 'KaiTi', 'Songti SC', 'SimSun', serif" fontWeight="bold">游</text>
  </>,
  souvenir: <>
    <path d="m11 8 57 1 3 3-1 56-3 3-57-1-2-3 1-56Z" strokeWidth="4.3" />
    <path d="M14 14h51v51H14Z" strokeWidth="1.3" />
    <g fill="currentColor" stroke="none" textAnchor="middle" fontFamily="'STKaiti', 'KaiTi', 'Songti SC', 'SimSun', serif" fontWeight="bold" fontSize="25">
      <text x="52" y="37">智</text><text x="52" y="61">游</text>
      <text x="28" y="37">华</text><text x="28" y="61">章</text>
    </g>
  </>,
}

export function ChineseSeal({ id, className }: { id: SealId | 'visit' | 'souvenir'; className?: string }) {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" className={className} aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      {engravings[id]}
    </svg>
  )
}
