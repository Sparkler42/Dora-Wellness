import React from "react";
import Icon from "./Icon";
import { T } from "../../styles/tokens";

export default function SectionHeader({ icon, ic, title, sub, act, onA }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, marginTop: 28 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <Icon n={icon} s={18} c={ic} />
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: T.tx, margin: 0 }}>{title}</h3>
        </div>
        {sub && <p style={{ color: T.txL, fontSize: 13, margin: 0 }}>{sub}</p>}
      </div>
      {act && (
        <button onClick={onA} style={{ background: "none", border: `1.5px solid ${T.bgW}`, borderRadius: 10, padding: "6px 12px", fontSize: 12, color: T.txM, cursor: "pointer", fontFamily: "'DM Sans'" }}>
          {act}
        </button>
      )}
    </div>
  );
}
