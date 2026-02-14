import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";
import { fmt } from "../../utils/formatTime";

export default function ExerciseDetail({ ex, onStart }) {
  const { doneToday, setModal } = useApp();

  return (
    <Modal onClose={() => setModal(null)}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: ex.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Icon n={ex.icon} s={28} c={ex.color} />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx, margin: "0 0 4px" }}>{ex.title}</h2>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>{ex.sub}</p>
      <p style={{ color: T.txM, fontSize: 14, margin: "0 0 18px" }}>{Math.round(ex.dur / 60)} minutes · {ex.steps.length} steps</p>
      <p style={{ color: T.tx, fontSize: 15, lineHeight: 1.7, margin: "0 0 22px" }}>{ex.desc}</p>
      <div style={{ background: T.bgW, borderRadius: 14, padding: 16, marginBottom: 24 }}>
        <p style={{ color: T.txM, fontSize: 13, fontWeight: 600, margin: "0 0 10px" }}>What you'll explore:</p>
        {ex.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < ex.steps.length - 1 ? `1px solid ${T.bg}` : "none" }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: ex.color + "20", color: ex.color, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {i + 1}
            </span>
            <span style={{ fontSize: 14, color: T.tx }}>{s.n}</span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: T.txL }}>{fmt(s.d)}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => { setModal(null); onStart(ex); }}
        style={{ width: "100%", padding: 16, border: "none", borderRadius: 14, background: `linear-gradient(135deg,${ex.color},${ex.color}CC)`, color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}
      >
        Begin Practice
      </button>
      {doneToday.includes(ex.id) && (
        <p style={{ textAlign: "center", color: T.sg, fontSize: 14, marginTop: 12, fontWeight: 500 }}>
          ✓ Completed today
        </p>
      )}
    </Modal>
  );
}
