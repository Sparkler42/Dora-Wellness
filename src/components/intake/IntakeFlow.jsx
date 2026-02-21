import { useState } from "react";
import Icon from "../ui/Icon";
import { T } from "../../styles/tokens";
import { intakeQuestions } from "../../data/intake-questions";
import { intakeDescriptors } from "../../data/intakeDescriptors";
import { notifCategories } from "../../data/notifications";
import { useApp } from "../../context/AppContext";
import WelcomeScreen from "./WelcomeScreen";
import AudioIntroScreen from "./AudioIntroScreen";

function InfoButton({ option, onOpen }) {
  if (!intakeDescriptors[option]) return null;
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onOpen({ title: option, body: intakeDescriptors[option] });
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: T.bgW,
        color: T.txL,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        flexShrink: 0,
        marginLeft: 8,
        fontFamily: "serif",
        lineHeight: 1,
      }}
    >
      i
    </span>
  );
}

function DescriptorOverlay({ descriptor, onClose }) {
  if (!descriptor) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(44,40,37,0.5)",
        backdropFilter: "blur(6px)",
        padding: 20,
        animation: "descFadeIn 0.25s ease",
      }}
    >
      <style>{`
        @keyframes descFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.bgC,
          borderRadius: 20,
          padding: "24px 22px 20px",
          maxWidth: 360,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: T.shE,
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "none",
            background: T.bgW,
            color: T.txL,
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans'",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: 20,
            color: T.tx,
            margin: "0 0 14px",
            paddingRight: 32,
            lineHeight: 1.3,
          }}
        >
          {descriptor.title}
        </h3>

        {/* Body */}
        <p
          style={{
            fontSize: 14,
            color: T.txM,
            lineHeight: 1.7,
            margin: "0 0 20px",
          }}
        >
          {descriptor.body}
        </p>

        {/* Got it button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px 16px",
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
          Got it
        </button>
      </div>
    </div>
  );
}

export default function IntakeFlow({ skipWelcome = false }) {
  const { setProfile, setScreen, setNotifs, setDiveDeeper, setTab, audioIntroSeen, setAudioIntroSeen } = useApp();
  const [showWelcome, setShowWelcome] = useState(!skipWelcome);
  const [showAudioIntro, setShowAudioIntro] = useState(!skipWelcome && !audioIntroSeen);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFork, setShowFork] = useState(false);
  const [descriptor, setDescriptor] = useState(null);

  const finishIntake = (goDeeper) => {
    const p = { ...answers };
    const nl = ["Very gently \u2014 minimal", "Balanced \u2014 a few daily", "Actively \u2014 keep me on track", "I'll come on my own"].indexOf(p.notifications);
    setNotifs(
      Object.fromEntries(
        notifCategories.map((n) => [
          n.id,
          n.id === "insight" ? (p.deviceWellness?.startsWith("Yes") ? 2 : 0) : Math.max(0, nl),
        ])
      )
    );
    setProfile(p);
    if (goDeeper) {
      setDiveDeeper((prev) => ({ ...prev, started: true, scrollTo: true }));
      setTab("profile");
    }
    setScreen("app");
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  if (showAudioIntro) {
    return (
      <AudioIntroScreen
        onContinue={() => {
          setAudioIntroSeen(true);
          setShowAudioIntro(false);
        }}
      />
    );
  }

  if (showFork) {
    return (
      <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 22px 0" }}>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 20px" }}>
            <span style={{ color: T.ac }}>spark</span>
          </h1>
        </div>
        <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <Icon n="sparkle" s={40} c={T.ac} />
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: T.tx, margin: "20px 0 10px", lineHeight: 1.3 }}>
            You're all set, {answers.name || "friend"}
          </h2>
          <p style={{ color: T.txL, fontSize: 15, lineHeight: 1.6, margin: "0 0 40px", maxWidth: 320 }}>
            Your practice is ready. You can jump right in, or take a moment to tell us more about yourself.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
            <p style={{ color: T.txM, fontSize: 14, margin: "0 0 -4px", lineHeight: 1.5, fontStyle: "italic" }}>
              The more we know, the better your practice becomes.
            </p>
            <button
              onClick={() => finishIntake(true)}
              style={{
                width: "100%", padding: "18px 20px", borderRadius: 16,
                border: "none",
                background: `linear-gradient(135deg, ${T.cl}, ${T.pl})`,
                color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans'",
                boxShadow: `0 4px 16px ${T.pl}40`,
              }}
            >
              Dive Deeper
            </button>
            <p style={{ color: T.txL, fontSize: 13, margin: "-4px 0 0" }}>Let's get to know each other more</p>
            <div style={{ height: 4 }} />
            <button
              onClick={() => finishIntake(false)}
              style={{
                width: "100%", padding: "18px 20px", border: "none", borderRadius: 16,
                background: `linear-gradient(135deg,${T.ac},${T.acS})`,
                color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans'",
              }}
            >
              Dive In
            </button>
            <p style={{ color: T.txL, fontSize: 13, margin: "-4px 0 0" }}>Let's play</p>
          </div>
        </div>
        <div style={{ height: 60 }} />
      </div>
    );
  }

  const q = intakeQuestions[step];
  const ans = answers[q.id];

  const setA = (v) => setAnswers((p) => ({ ...p, [q.id]: v }));
  const toggleMulti = (o) => {
    const c = ans || [];
    setA(c.includes(o) ? c.filter((x) => x !== o) : [...c, o]);
  };
  const toggleMulti3 = (o) => {
    const c = ans || [];
    if (c.includes(o)) {
      setA(c.filter((x) => x !== o));
    } else if (c.length < 3) {
      setA([...c, o]);
    }
  };

  const ok =
    q.tp === "text"
      ? (ans || "").trim().length > 0
      : q.tp === "multi" || q.tp === "multi3"
        ? (ans || []).length > 0
        : !!ans;

  const next = () => {
    if (step < intakeQuestions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setShowFork(true);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px 22px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: T.tx, margin: "0 0 20px" }}>
          <span style={{ color: T.ac }}>spark</span>
        </h1>
        <div style={{ height: 4, background: T.bgW, borderRadius: 2, marginBottom: 32 }}>
          <div style={{ height: 4, background: T.ac, borderRadius: 2, width: `${((step + 1) / intakeQuestions.length) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column" }}>
        <p style={{ color: T.txL, fontSize: 13, letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 8px" }}>
          {step + 1} of {intakeQuestions.length}
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: "0 0 8px", lineHeight: 1.3 }}>
          {q.q}
        </h2>
        {q.sub && (
          <p style={{ color: T.txL, fontSize: 14, margin: "0 0 20px", lineHeight: 1.5, fontStyle: "italic" }}>
            {q.sub}
          </p>
        )}
        {!q.sub && <div style={{ height: 20 }} />}

        {q.tp === "text" && (
          <input
            value={ans || ""}
            onChange={(e) => setA(e.target.value)}
            placeholder={q.ph}
            onKeyDown={(e) => e.key === "Enter" && ok && next()}
            autoFocus
            style={{ width: "100%", padding: "16px 18px", borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, fontSize: 18, fontFamily: "'DM Sans'", color: T.tx, outline: "none", boxSizing: "border-box" }}
          />
        )}

        {q.tp === "date" && (
          <input
            type="date"
            value={ans || ""}
            onChange={(e) => setA(e.target.value)}
            autoFocus
            style={{ width: "100%", padding: "16px 18px", borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, fontSize: 18, fontFamily: "'DM Sans'", color: T.tx, outline: "none", boxSizing: "border-box" }}
          />
        )}

        {q.tp === "multi3" && (() => {
          const selected = ans || [];
          const atMax = selected.length >= 3;
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", maxHeight: "55vh", paddingRight: 2 }}>
              {q.o.map((o) => {
                const sel = selected.includes(o);
                const emoji = o.slice(0, 2);
                const text = o.slice(3);
                return (
                  <button
                    key={o}
                    onClick={() => toggleMulti3(o)}
                    style={{
                      padding: "14px 16px", borderRadius: 16,
                      border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                      background: sel ? T.acG : T.bgC,
                      textAlign: "left", cursor: sel || !atMax ? "pointer" : "default",
                      fontFamily: "'DM Sans'", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 14,
                      opacity: !sel && atMax ? 0.45 : 1,
                    }}
                  >
                    <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                    <span style={{ fontSize: 14, color: sel ? T.ac : T.tx, fontWeight: sel ? 600 : 400, flex: 1, lineHeight: 1.4 }}>{text}</span>
                    <InfoButton option={o} onOpen={setDescriptor} />
                  </button>
                );
              })}
              {atMax && (
                <p style={{ color: T.txL, fontSize: 13, textAlign: "center", margin: "4px 0 0", fontStyle: "italic" }}>
                  You've picked 3 — that's your limit for this one
                </p>
              )}
            </div>
          );
        })()}

        {q.tp === "choice" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.o.map((o) => (
              <button
                key={o}
                onClick={() => setA(o)}
                style={{
                  padding: "16px 18px", borderRadius: 14,
                  border: ans === o ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                  background: ans === o ? T.acG : T.bgC,
                  textAlign: "left", fontSize: 15, color: T.tx, cursor: "pointer",
                  fontFamily: "'DM Sans'", fontWeight: ans === o ? 600 : 400, transition: "all 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <span>{o}</span>
                <InfoButton option={o} onOpen={setDescriptor} />
              </button>
            ))}
          </div>
        )}

        {q.tp === "multi" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {q.o.map((o) => {
              const sel = (ans || []).includes(o);
              return (
                <button
                  key={o}
                  onClick={() => toggleMulti(o)}
                  style={{
                    padding: "11px 16px", borderRadius: 20,
                    border: sel ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                    background: sel ? T.acG : T.bgC,
                    fontSize: 14, color: sel ? T.ac : T.txM, cursor: "pointer",
                    fontFamily: "'DM Sans'", fontWeight: sel ? 600 : 400, transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 4,
                  }}
                >
                  <span>{o}</span>
                  <InfoButton option={o} onOpen={setDescriptor} />
                </button>
              );
            })}
          </div>
        )}

        <div style={{ flex: 1 }} />

        <div style={{ padding: "20px 0 40px", display: "flex", gap: 12 }}>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ width: 50, height: 50, borderRadius: 14, border: `1.5px solid ${T.bgW}`, background: T.bgC, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon n="back" s={18} c={T.txM} />
            </button>
          )}
          <button
            onClick={ok ? next : undefined}
            disabled={!ok}
            style={{
              flex: 1, padding: "15px", border: "none", borderRadius: 14,
              background: ok ? `linear-gradient(135deg,${T.ac},${T.acS})` : T.bgW,
              color: ok ? "#fff" : T.txL, fontSize: 16, fontWeight: 600,
              cursor: ok ? "pointer" : "not-allowed", fontFamily: "'DM Sans'",
            }}
          >
            {step === intakeQuestions.length - 1 ? "Begin Your Practice" : "Continue"}
          </button>
        </div>
      </div>

      <DescriptorOverlay descriptor={descriptor} onClose={() => setDescriptor(null)} />
    </div>
  );
}
