// src/components/PasswordGate.jsx
//
// A simple password gate that sits in front of the entire app.
// Stores auth state in sessionStorage so the user only enters
// the password once per browser session.
//
// TO USE:
//   1. Wrap your root App render with <PasswordGate>...</PasswordGate>
//   2. Change SPARK_PASSWORD below to whatever password you want
//   3. To disable the gate entirely, set GATE_ENABLED = false
//   4. To change the password, just update SPARK_PASSWORD
//
// NOTE: This is a soft gate — it stops casual sharing, not determined hackers.
// It is NOT a substitute for real authentication.

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — edit these two lines
// ─────────────────────────────────────────────────────────────────────────────

const GATE_ENABLED  = true;           // set to false to disable gate entirely
const SPARK_PASSWORD = "sparkbeta";   // change this to your chosen password

// ─────────────────────────────────────────────────────────────────────────────
// SESSION KEY
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = "spark_gate_auth";

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function PasswordGate({ children }) {
  const [authed, setAuthed]       = useState(false);
  const [value, setValue]         = useState("");
  const [error, setError]         = useState(false);
  const [shaking, setShaking]     = useState(false);
  const [revealing, setRevealing] = useState(false);
  const inputRef                  = useRef(null);

  // Check session on mount
  useEffect(() => {
    if (!GATE_ENABLED) { setAuthed(true); return; }
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  // Focus input on mount
  useEffect(() => {
    if (!authed && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [authed]);

  function attempt() {
    if (value.trim().toLowerCase() === SPARK_PASSWORD.toLowerCase()) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setRevealing(true);
      setTimeout(() => setAuthed(true), 600);
    } else {
      setError(true);
      setShaking(true);
      setValue("");
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter") attempt();
  }

  if (authed) return children;

  return (
    <div style={styles.overlay}>

      {/* Ambient background orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      {/* Gate card */}
      <div
        style={{
          ...styles.card,
          ...(revealing ? styles.cardRevealing : {}),
        }}
      >
        {/* Spark mark */}
        <div style={styles.mark}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke="#c4a882" strokeWidth="1.5" />
            <path
              d="M18 8 L21 16 L29 16 L23 21 L25 29 L18 24 L11 29 L13 21 L7 16 L15 16 Z"
              fill="none"
              stroke="#c4a882"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <div style={styles.headingGroup}>
          <h1 style={styles.heading}>Spark</h1>
          <p style={styles.subheading}>
            This is an early preview.<br />
            Enter the access word to continue.
          </p>
        </div>

        {/* Input row */}
        <div
          style={{
            ...styles.inputWrap,
            ...(shaking ? styles.shake : {}),
          }}
        >
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            onKeyDown={handleKey}
            placeholder="access word"
            className="spark-gate-input"
            style={{
              ...styles.input,
              ...(error ? styles.inputError : {}),
            }}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={attempt}
            style={styles.btn}
            onMouseEnter={e => (e.currentTarget.style.background = "#b8976e")}
            onMouseLeave={e => (e.currentTarget.style.background = "#c4a882")}
          >
            →
          </button>
        </div>

        {/* Error message */}
        <p
          style={{
            ...styles.errorMsg,
            opacity: error ? 1 : 0,
          }}
        >
          That's not quite it — try again
        </p>

        {/* Footer */}
        <p style={styles.footer}>
          by David &amp; Caroline · Embody Your Now
        </p>
      </div>

      <style>{`
        @keyframes spark-shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
        @keyframes spark-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spark-float {
          0%,100% { transform: translateY(0px) scale(1); }
          50%     { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes spark-reveal {
          to { opacity: 0; transform: scale(1.04); }
        }
        .spark-gate-input::placeholder {
          color: #b8a898;
          font-style: italic;
          letter-spacing: 0.15em;
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = {
  overlay: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1a1612",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },

  orb1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(196,168,130,0.12) 0%, transparent 70%)",
    top: "-100px",
    right: "-100px",
    animation: "spark-float 8s ease-in-out infinite",
    pointerEvents: "none",
  },

  orb2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(196,168,130,0.08) 0%, transparent 70%)",
    bottom: "-80px",
    left: "-80px",
    animation: "spark-float 10s ease-in-out infinite reverse",
    pointerEvents: "none",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    padding: "3rem 2.5rem",
    maxWidth: "360px",
    width: "90%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(196,168,130,0.18)",
    borderRadius: "24px",
    backdropFilter: "blur(12px)",
    animation: "spark-fadein 0.7s ease both",
    position: "relative",
    zIndex: 1,
  },

  cardRevealing: {
    animation: "spark-reveal 0.5s ease forwards",
  },

  mark: {
    opacity: 0.9,
  },

  headingGroup: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  heading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "2.2rem",
    color: "#f0e8dc",
    margin: 0,
    fontWeight: 400,
    letterSpacing: "0.04em",
  },

  subheading: {
    fontSize: "0.875rem",
    color: "#9a8a78",
    margin: 0,
    lineHeight: 1.6,
    letterSpacing: "0.01em",
  },

  inputWrap: {
    display: "flex",
    gap: "0.5rem",
    width: "100%",
  },

  shake: {
    animation: "spark-shake 0.45s ease",
  },

  input: {
    flex: 1,
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid rgba(196,168,130,0.25)",
    background: "rgba(255,255,255,0.05)",
    color: "#f0e8dc",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    letterSpacing: "0.1em",
    outline: "none",
    transition: "border-color 0.2s",
  },

  inputError: {
    borderColor: "rgba(220,100,80,0.6)",
  },

  btn: {
    padding: "0.75rem 1.1rem",
    borderRadius: "10px",
    border: "none",
    background: "#c4a882",
    color: "#1a1612",
    fontSize: "1.1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.15s",
    flexShrink: 0,
  },

  errorMsg: {
    fontSize: "0.8rem",
    color: "#dc8060",
    margin: "-0.5rem 0 0",
    transition: "opacity 0.3s ease",
    textAlign: "center",
  },

  footer: {
    fontSize: "0.75rem",
    color: "#5a4e42",
    margin: 0,
    letterSpacing: "0.05em",
  },
};
