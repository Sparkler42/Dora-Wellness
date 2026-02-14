import Icon from "../ui/Icon";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";
import { isLocked } from "../../hooks/useRecommendations";

export default function ExerciseCard({ ex, idx }) {
  const { doneToday, tier, setModal, mounted } = useApp();
  const done = doneToday.includes(ex.id);
  const locked = isLocked(ex, tier);

  return (
    <div
      onClick={() => locked ? setModal({ t: "pay" }) : setModal({ t: "detail", d: ex })}
      style={{
        background: T.bgC,
        borderRadius: 16,
        padding: 16,
        boxShadow: T.sh,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "all 0.25s",
        position: "relative",
        overflow: "hidden",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${(idx || 0) * 50}ms`,
        border: done ? `1.5px solid ${T.sg}40` : "1.5px solid transparent",
      }}
    >
      {done && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${T.sg},${T.sgS})` }} />
      )}
      <div
        style={{
          width: 48, height: 48, borderRadius: 14,
          background: done ? T.sgG : locked ? T.bgW : ex.color + "15",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >
        {done ? <Icon n="check" s={22} c={T.sg} /> : locked ? <Icon n="lock" s={20} c={T.txL} /> : <Icon n={ex.icon} s={22} c={ex.color} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 600, color: done ? T.sg : locked ? T.txL : T.tx }}>{ex.title}</h4>
        <p style={{ margin: 0, fontSize: 13, color: T.txL }}>{ex.sub}</p>
      </div>
      <span style={{ fontSize: 12, color: T.txL, background: T.bgW, padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
        {Math.round(ex.dur / 60)}m
      </span>
    </div>
  );
}
