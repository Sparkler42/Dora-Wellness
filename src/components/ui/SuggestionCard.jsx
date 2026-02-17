import { useState, useEffect } from "react";
import Icon from "./Icon";
import { T } from "../../styles/tokens";

export default function SuggestionCard({ suggestion, onAccept, onDismiss }) {
  const [exiting, setExiting] = useState(false);

  // Reset exit state when suggestion changes
  useEffect(() => {
    setExiting(false);
  }, [suggestion?.ruleId]);

  if (!suggestion) return null;

  const ex = suggestion.exercise;

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(onDismiss, 300);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 90,
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: 380,
        background: T.bgC,
        borderRadius: 18,
        padding: "16px 18px",
        boxShadow: T.shE,
        borderLeft: `4px solid ${ex.color}`,
        zIndex: 80,
        animation: exiting ? "fadeOut 0.3s ease forwards" : "slideUpFade 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: ex.color + "15",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon n={ex.icon} s={20} c={ex.color} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 15, color: T.tx, margin: "0 0 3px" }}>
            {ex.title}
          </h4>
          <p style={{ color: T.txL, fontSize: 13, margin: 0, lineHeight: 1.4 }}>
            {suggestion.message}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button
          onClick={onAccept}
          style={{
            flex: 1,
            padding: "10px 16px",
            border: "none",
            borderRadius: 12,
            background: `linear-gradient(135deg,${T.ac},${T.acS})`,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans'",
          }}
        >
          Try it
        </button>
        <button
          onClick={handleDismiss}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: 12,
            background: T.bgW,
            color: T.txM,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans'",
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
