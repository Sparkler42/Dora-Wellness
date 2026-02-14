import { useState } from "react";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { T } from "../../styles/tokens";
import { tiers } from "../../data/tiers";

export default function PaywallModal({ onClose, onSelect }) {
  const [sel, setSel] = useState(1);

  return (
    <Modal dark onClose={onClose}>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: T.txD, margin: "0 0 6px", textAlign: "center" }}>
        Deepen Your Practice
      </h2>
      <p style={{ color: "rgba(240,236,230,0.6)", fontSize: 14, textAlign: "center", margin: "0 0 28px", lineHeight: 1.5 }}>
        From guided sessions to private work with David & Caroline
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {tiers.map((t, i) => (
          <div
            key={i}
            onClick={() => setSel(i)}
            style={{
              border: sel === i ? `2px solid ${t.c}` : "2px solid rgba(255,255,255,0.08)",
              borderRadius: 18, padding: "18px 16px", cursor: "pointer",
              background: sel === i ? t.c + "12" : "rgba(255,255,255,0.03)",
              transition: "all 0.25s", position: "relative",
            }}
          >
            {t.pop && (
              <div style={{ position: "absolute", top: -10, right: 16, background: t.c, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase" }}>
                Popular
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: T.txD, margin: 0 }}>{t.nm}</h3>
              <div>
                <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: t.c }}>{t.pr}</span>
                <span style={{ color: "rgba(240,236,230,0.5)", fontSize: 13 }}>{t.per}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {t.f.map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ marginTop: 3, flexShrink: 0 }}><Icon n="check" s={14} c={t.c} /></div>
                  <span style={{ color: "rgba(240,236,230,0.75)", fontSize: 13, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => onSelect(tiers[sel].id)}
        style={{
          width: "100%", padding: 16, border: "none", borderRadius: 14, marginTop: 20,
          background: `linear-gradient(135deg,${tiers[sel].c},${tiers[sel].c}CC)`,
          color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'",
        }}
      >
        {sel === 0 ? "Continue with Free" : `Start ${tiers[sel].nm}`}
      </button>
    </Modal>
  );
}
