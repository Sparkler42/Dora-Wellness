import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";

export default function DeviceWellnessModal({ onClose }) {
  const { profile } = useApp();

  const metrics = [
    { m: "Screen time today", v: "2h 14m", n: "32 min less than average", g: true },
    { m: "Phone pickups", v: "23", n: "Down from 38 last week", g: true },
    { m: "Longest session", v: "47 min", n: "Try a movement break after 30 min", g: false },
    { m: "First pickup", v: "7:42 AM", n: "Try: morning practice before screen", g: false },
  ];

  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <Icon n="phone" s={22} c={T.oc} />
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: 0 }}>Device Wellness</h2>
      </div>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 6px", lineHeight: 1.5 }}>
        When you notice the urge for your phone, pause and feel the underlying state. Ask: <em>"What does my body-mind actually need?"</em>
      </p>
      <p style={{ color: T.txL, fontSize: 13, margin: "0 0 20px", fontStyle: "italic" }}>
        — David's attention practice
      </p>
      {profile?.deviceWellness?.startsWith("Yes") && (
        <div style={{ background: T.sgG, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Icon n="check" s={16} c={T.sg} />
            <span style={{ color: T.sg, fontSize: 13, fontWeight: 600 }}>Device Awareness: Enabled</span>
          </div>
          <p style={{ color: T.txM, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
            Tracking patterns to help redirect attention toward what truly nourishes you.
          </p>
        </div>
      )}
      {metrics.map((d, i) => (
        <div key={i} style={{ background: T.bgC, borderRadius: 14, padding: "14px 16px", boxShadow: T.sh, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <span style={{ color: T.txM, fontSize: 13 }}>{d.m}</span>
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: T.tx }}>{d.v}</span>
          </div>
          <p style={{ color: d.g ? T.sg : T.cl, fontSize: 13, margin: 0 }}>{d.n}</p>
        </div>
      ))}
      <div style={{ marginTop: 10, background: T.acG, borderRadius: 14, padding: 16 }}>
        <h4 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: T.tx, margin: "0 0 8px" }}>Today's Suggestion</h4>
        <p style={{ color: T.txM, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          You picked up your phone 6 times between 2-4 PM. That window would be great for a 10-minute Active Stretching break or Sensory Observation practice.
        </p>
      </div>
    </Modal>
  );
}
