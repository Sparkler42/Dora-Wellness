export default function Orb({ color, sz, top, left, d = 0 }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: sz,
        height: sz,
        borderRadius: "50%",
        background: color,
        filter: "blur(60px)",
        opacity: 0.35,
        animation: `orbFloat 12s ease-in-out ${d}s infinite alternate`,
        pointerEvents: "none",
      }}
    />
  );
}
