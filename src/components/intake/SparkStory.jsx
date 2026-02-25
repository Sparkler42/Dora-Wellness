// src/components/intake/SparkStory.jsx
import { useEffect, useRef } from "react";

const BRIDGES = {
  friend_referral:
    "Someone who knows you thought you'd appreciate this. That says something — about them, and about you. You're already in good company.",
  searched:
    "You went looking for something. That impulse — to feel better, move better, be more present — is exactly what Spark is built to meet.",
  saw_it:
    "Something caught your eye and you followed the thread. We think you'll find it was worth the click.",
  practitioner_referral:
    "Someone who works with bodies for a living sent you here. That's not an accident — they saw something in Spark that reminded them of you.",
  highly_rated:
    "You heard Spark helps people feel genuinely good — not just functional, but alive and at ease in their bodies. That's exactly what we're here for.",
  david_caroline:
    "You've already experienced something of what David and Caroline offer. Spark is that same approach — available whenever you need it.",
  browsing:
    "Something stopped you mid-scroll. We think that instinct was right. You're welcome to find out why.",
  dont_remember:
    "However you got here, you stayed. That's enough. Spark will take it from there.",
};

// Map option strings (as stored by intake) to bridge keys
const OPTION_TO_KEY = {
  "friend": "friend_referral",
  "looking": "searched",
  "saw it": "saw_it",
  "yoga teacher": "practitioner_referral",
  "highest rated": "highly_rated",
  "David or Caroline": "david_caroline",
  "browsing": "browsing",
  "don\u2019t remember": "dont_remember",
  "Something else": "other",
};

function resolveBridgeKey(optionString) {
  if (!optionString) return null;
  for (const [fragment, key] of Object.entries(OPTION_TO_KEY)) {
    if (optionString.includes(fragment)) return key;
  }
  return null;
}

function getBridge(arrivalValue, arrivalOther) {
  const key = resolveBridgeKey(arrivalValue);
  if (key === "other") {
    if (arrivalOther && arrivalOther.trim().length > 0) {
      return "You came with your own story. Spark will meet you exactly there.";
    }
    return "However you arrived, you're here. Spark will meet you exactly where you are.";
  }
  return (key && BRIDGES[key]) || "However you arrived, you're here. Spark will meet you exactly where you are.";
}

export default function SparkStory({ arrivalValue, arrivalOther, userName, onContinue }) {
  const bridge = getBridge(arrivalValue, arrivalOther);
  const btnRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById("spark-story-card");
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }
  }, []);

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem", background: "var(--color-bg, #faf8f5)" }}>
      <div id="spark-story-card" style={{ maxWidth: "480px", width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {userName && (
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.875rem", color: "var(--color-muted, #a89b8c)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
            {userName}, welcome.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontFamily: "DM Serif Display, serif", fontSize: "clamp(1.25rem, 4vw, 1.6rem)", lineHeight: 1.4, color: "var(--color-text, #2d2a26)", margin: 0 }}>
            Spark is built around one simple idea: you already have more than you think.
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-soft, #5a524a)", margin: 0 }}>
            Most wellness tools start with what's wrong. Spark starts with what's already working — and helps you expand from there.
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-soft, #5a524a)", margin: 0 }}>
            Everything we offer is designed around you — your body, your pace, your curiosity. Not a program to follow. A practice to discover.
          </p>
        </div>

        <div style={{ height: "1px", background: "var(--color-border, #e8e2da)", borderRadius: "1px" }} />

        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text, #2d2a26)", fontStyle: "italic", margin: 0 }}>
          {bridge}
        </p>

        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "var(--color-text-soft, #5a524a)", margin: 0 }}>
          Over the next few screens, we'll get to know you a little better — so everything Spark offers feels like it was made for you. Because it will be.
        </p>

        <button
          ref={btnRef}
          onClick={onContinue}
          style={{ marginTop: "0.5rem", padding: "0.875rem 1.5rem", borderRadius: "999px", border: "none", background: "var(--color-primary, #7c6f5e)", color: "#fff", fontFamily: "DM Sans, sans-serif", fontSize: "1rem", fontWeight: 600, cursor: "pointer", width: "100%", letterSpacing: "0.02em", transition: "background 0.2s ease, transform 0.1s ease" }}
          onMouseEnter={e => (e.target.style.background = "var(--color-primary-dark, #6b5e4f)")}
          onMouseLeave={e => (e.target.style.background = "var(--color-primary, #7c6f5e)")}
          onMouseDown={e => (e.target.style.transform = "scale(0.98)")}
          onMouseUp={e => (e.target.style.transform = "scale(1)")}
        >
          Let's keep going →
        </button>

      </div>
    </div>
  );
}
