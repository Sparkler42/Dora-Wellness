import { T } from "../../styles/tokens";

export default function Icon({ n, s = 22, c = T.txM }) {
  const p = {
    fill: "none",
    stroke: c,
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    home: <path d="M3 12l9-8 9 8v9a1 1 0 01-1 1h-5v-5h-6v5H4a1 1 0 01-1-1z" {...p} />,
    lotus: (
      <>
        <path d="M12 21c-4-3-7-7-7-10.5C5 7 8 4 12 4s7 3 7 6.5c0 3.5-3 7.5-7 10.5z" {...p} />
        <path d="M12 4v17" stroke={c} strokeWidth="1.2" strokeDasharray="2 2" />
      </>
    ),
    muscle: <path d="M7 12h10M9 8l-2 4 2 4M15 8l2 4-2 4" {...p} />,
    brain: (
      <>
        <path d="M12 3c-2 0-4 1.5-4 4 0 1.5.8 2.8 2 3.5V21h4v-10.5c1.2-.7 2-2 2-3.5 0-2.5-2-4-4-4z" {...p} />
        <path d="M9 10.5C7.5 11 6 12.5 6 14.5c0 2.5 2.5 4 4 4M15 10.5c1.5.5 3 2 3 4 0 2.5-2.5 4-4 4" fill="none" stroke={c} strokeWidth="1.5" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" fill={c} />
        <path d="M18 14l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5L14.5 17l2.5-1z" fill={c} opacity=".5" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" {...p} />
        <circle cx="12" cy="12" r="3" {...p} />
      </>
    ),
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" {...p} />,
    leaf: (
      <>
        <path d="M17 4s-3 1-5 4-3 7-3 7 3-1 5-4 3-7 3-7z" {...p} />
        <path d="M9 15l8-8" fill="none" stroke={c} strokeWidth="1.2" />
      </>
    ),
    bell: <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" {...p} />,
    check: <path d="M5 12l5 5L20 7" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" {...p} />
        <path d="M8 11V7a4 4 0 018 0v4" {...p} />
      </>
    ),
    star: <path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.8 3-1.1-6.5L.4 8.8l6.5-.9z" fill={c} />,
    arrow: <path d="M5 12h14m-6-6l6 6-6 6" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    back: <path d="M19 12H5m6-6l-6 6 6 6" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    phone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" {...p} />
        <path d="M10 18h4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    close: <path d="M18 6L6 18M6 6l12 12" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />,
    chat: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" {...p} />,
    send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" {...p} />,
    pause: (
      <>
        <rect x="6" y="4" width="4" height="16" rx="1" fill={c} />
        <rect x="14" y="4" width="4" height="16" rx="1" fill={c} />
      </>
    ),
    playBtn: <path d="M5 3l14 9-14 9z" fill={c} />,
    profile: (
      <>
        <circle cx="12" cy="9" r="3.5" {...p} />
        <path d="M5.5 20.5c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" {...p} />
      </>
    ),
    food: (
      <>
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" {...p} />
        <path d="M6 1v3M10 1v3M14 1v3" {...p} />
      </>
    ),
    medical: (
      <>
        <path d="M12 2a3 3 0 00-3 3v4H5a3 3 0 000 6h4v4a3 3 0 006 0v-4h4a3 3 0 000-6h-4V5a3 3 0 00-3-3z" {...p} />
      </>
    ),
    upload: (
      <>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" {...p} />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" {...p} />
        <path d="M12 7v5l3 3" {...p} />
      </>
    ),
    walk: (
      <>
        <circle cx="12" cy="4" r="2" fill={c} />
        <path d="M9 8h6l-1.5 6-2.5 2v5M13.5 14l2.5 2v5M9 8l-3 6" {...p} />
      </>
    ),
    run: (
      <>
        <circle cx="13" cy="4" r="2" fill={c} />
        <path d="M10 8h5l-2 6-3 3-2 4M13 14l3 2 3 1M10 8l-4 4-3 1" {...p} />
      </>
    ),
    location: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" {...p} />,
    steps: (
      <>
        <path d="M8 4c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM16 14c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3z" {...p} />
        <ellipse cx="8" cy="7" rx="1.2" ry="2" fill={c} opacity=".3" />
        <ellipse cx="16" cy="17" rx="1.2" ry="2" fill={c} opacity=".3" />
      </>
    ),
    shield: (
      <path d="M12 2l7 4v5c0 5.25-3.5 8.25-7 10-3.5-1.75-7-4.75-7-10V6z" {...p} />
    ),
  };

  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      {icons[n] || null}
    </svg>
  );
}
